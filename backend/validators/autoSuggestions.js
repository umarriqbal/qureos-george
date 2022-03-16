const Joi = require("@hapi/joi");

const autoSuggestionsValidator = (data) => {
  const autoSuggestionsSchema = Joi.object({
    token: Joi.string().required(),
  });
  return autoSuggestionsSchema.validate(data);
};

module.exports = autoSuggestionsValidator;
