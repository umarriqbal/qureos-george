const mongoose = require("mongoose");

const validateDBId = (value, helpers) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  throw new Error("it's not a valid id.");
};

module.exports.validateDBId = validateDBId;
