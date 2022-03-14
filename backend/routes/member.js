const router = require("express").Router();

const createMemberController = require("../controllers/member/createMember");
// const addFriendController = require("../controllers/member/addFriend");
// const scrapeController = require("../controllers/member/scrapeContent");
// const getMemberController = require("../controllers/member/getMember");

// router.get("/get", getMemberController);
router.post("/create", createMemberController);
// router.post("/add-friend", addFriendController);

// If a website needs to be scraped again to update content in database.
// router.post("/scrape", scrapeController);

module.exports = router;
