const Joi = require("@hapi/joi");
const { validateDBId, validateBool } = require("../modules/validation");

const getMemberValidator = (data) => {
  const getMemberSchema = Joi.object({
    memberId: Joi.string().custom(validateDBId, "custom validation"),
    nameToken: Joi.string(),
    token: Joi.string(),
    getOne: Joi.string().custom(validateBool, "custom validation"),
  });
  return getMemberSchema.validate(data);
};

module.exports = getMemberValidator;
