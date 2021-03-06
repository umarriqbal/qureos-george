const Member = require("../../models/Member");
const getMemberValidator = require("../../validators/getMember");
const { getFilterParams, getMembers } = require("../../modules/member");

const getMemberController = async (req, res) => {
  const { value, error } = getMemberValidator(req.query);

  if (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.details[0].message,
      },
    });
  }
  const filterIds = await getFilterParams(value);
  const memberObjs = await getMembers(filterIds);

  if (!memberObjs) {
    return res.status(404).send({
      sucess: false,
      error: {
        message: "No members found!",
      },
    });
  }

  if (value.getOne === true) {
    return res.status(200).send({
      success: true,
      data: memberObjs[0],
    });
  }

  return res.status(200).send({
    success: true,
    data: memberObjs,
  });
};
module.exports = getMemberController;
