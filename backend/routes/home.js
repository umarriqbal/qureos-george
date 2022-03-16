const router = require("express").Router();

const homeController = require("../controllers/home/home");
const autoSuggestionsController = require("../controllers/home/autosuggestions");
// const searchController = require("../controllers/home/search");

router.get("/", homeController);
router.get("/autosuggestions/:token", autoSuggestionsController);
// router.post("/search", searchController);

module.exports = router;
