const Member = require("../../models/Member");
const searchValidator = require("../../validators/search");
const { getMembersFromToken } = require("../../modules/member");
const { getPathToUsers } = require("../../modules/search");

const searchController = async (req, res) => {
  const { value, error } = searchValidator(req.body);

  if (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.details[0].message,
      },
    });
  }

  const srcMemberId = value.myId;
  const srcMember = await Member.findOne({ _id: srcMemberId });
  const srcFriends = srcMember.friendList;

  const destinationMemberIds = await getMembersFromToken(value.token);

  // Removing source and their friends from destination writers.
  const srcIdx = destinationMemberIds.indexOf(srcMember.id);
  if (srcIdx > -1) {
    destinationMemberIds.splice(srcIdx, 1);
  }
  const filteredMemberIds = destinationMemberIds.filter(
    (el) => !srcFriends.includes(el)
  );

  // Getting breadcrumb chains for all remaining writers.
  const destChains = await getPathToUsers(
    srcMemberId,
    filteredMemberIds,
    value.token
  );

  res.status(200).send({
    success: true,
    data: {
      membersFound: filteredMemberIds.length,
      pathsFound: destChains.length,
      paths: destChains,
    },
  });
};

module.exports = searchController;
