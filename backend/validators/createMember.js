const Joi = require("@hapi/joi");

const createMemberValidator = (data) => {
  const createMemberSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    website: Joi.string().min(6).max(1024).required(),
  });
  return createMemberSchema.validate(data);
};

module.exports = createMemberValidator;
