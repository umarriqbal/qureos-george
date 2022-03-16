const mongoose = require("mongoose");

const validateDBId = (value, helpers) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  throw new Error("it's not a valid id.");
};

const validateBool = (value, helpers) => {
  if (["y", "yes", "true"].includes(value)) {
    return true;
  }
  return false;
};

module.exports.validateDBId = validateDBId;
module.exports.validateBool = validateBool;
