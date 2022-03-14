const router = require("express").Router();

const createMemberController = require("../controllers/member/createMember");
const addFriendController = require("../controllers/member/addFriend");
// const getMemberController = require("../controllers/member/getMember");

// router.get("/get", getMemberController);
router.post("/create", createMemberController);
router.post("/add-friend", addFriendController);

module.exports = router;
