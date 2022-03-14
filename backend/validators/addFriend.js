const Joi = require("@hapi/joi");
const { validateDBId } = require("../modules/validation");

const addFriendValidator = (data) => {
  const addFriendSchema = Joi.object({
    friend1: Joi.string().required().custom(validateDBId, "custom validation"),
    friend2: Joi.string().required().custom(validateDBId, "custom validation"),
  });
  return addFriendSchema.validate(data);
};

module.exports = addFriendValidator;
