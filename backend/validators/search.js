const Joi = require("@hapi/joi");
const { validateDBId } = require("../modules/validation");

const searchValidator = (data) => {
  const searchSchema = Joi.object({
    myId: Joi.string().required().custom(validateDBId, "custom validation"),
    token: Joi.string().required(),
  });
  return searchSchema.validate(data);
};

module.exports = searchValidator;
