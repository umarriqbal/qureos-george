const mongoose = require("mongoose");

const websiteTokenSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
    max: 1024,
  },
  headingText: {
    type: String,
    required: true,
    max: 100,
  },
  headingToken: {
    type: String,
    required: true,
    max: 50,
  },
});

websiteTokenSchema.virtual("writer", {
  ref: "Member",
  localField: "website",
  foreignField: "website",
});

module.exports = mongoose.model("WebsiteToken", websiteTokenSchema);
