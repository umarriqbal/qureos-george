const Member = require("../../models/Member");
const addFriendValidator = require("../../validators/addFriend");
const { isFriends, makeFriends } = require("../../modules/member");

const addFriendController = async (req, res) => {
  const { error } = addFriendValidator(req.body);

  if (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.details[0].message,
      },
    });
  }

  const toBeFriends = await Member.find({
    _id: [req.body.friend1, req.body.friend2],
  });
  if (toBeFriends.length != 2) {
    return res.status(400).send({
      success: false,
      error: {
        message: "Members do not exist.",
      },
    });
  }

  const friend1 = toBeFriends[0];
  const friend2 = toBeFriends[1];

  const isAlreadyFriends = await isFriends(friend1, friend2);
  if (isAlreadyFriends) {
    return res.status(400).send({
      success: false,
      error: {
        message: "Members are already friends!",
      },
    });
  }

  const isNowFriends = await makeFriends(friend1, friend2);
  if (!isNowFriends) {
    return res.status(501).send({
      success: false,
      error: {
        message: "Something went wrong!",
      },
    });
  }

  return res.status(200).send({
    success: false,
    data: {
      message: `${friend1.name} and ${friend2.name} are now friends.`,
    },
  });
};
module.exports = addFriendController;
