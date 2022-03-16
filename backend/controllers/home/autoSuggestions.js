const WebsiteToken = require("../../models/WebsiteToken");
const autoSuggestionsValidator = require("../../validators/autoSuggestions");

const autoSuggestionsController = async (req, res) => {
  const { value, error } = autoSuggestionsValidator(req.params);

  if (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.details[0].message,
      },
    });
  }

  const foundTokens = await WebsiteToken.find({
    headingToken: { $regex: `^${value.token}` },
  });

  if (foundTokens.length === 0) {
    return res.status(404).send({
      success: false,
      error: {
        message: "No tokens found!",
      },
    });
  }

  var tokensList = [];
  foundTokens.forEach((token) => {
    if (!tokensList.includes(token.headingToken)) {
      tokensList.push(token.headingToken);
    }
  });
  res.status(200).send({
    success: true,
    data: tokensList,
  });
};

module.exports = autoSuggestionsController;
