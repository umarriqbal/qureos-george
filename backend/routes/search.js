const router = require("express").Router();

const autoSuggestionsController = require("../controllers/search/autoSuggestions");
const searchController = require("../controllers/search/search");

router.post("/", searchController);
router.get("/autosuggestions/:token", autoSuggestionsController);

module.exports = router;
