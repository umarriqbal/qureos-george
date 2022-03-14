const Member = require("../../models/Member");

const homeController = async (req, res) => {
  try {
    const member = await Member.findOne({ _id: req.query.myId });
    return res.status(200).send({
      success: true,
      data: {
        member: member,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: err,
    });
  }
};

module.exports = homeController;
