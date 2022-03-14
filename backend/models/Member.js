const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    website: {
      type: String,
      required: true,
      unique: true,
      max: 1024,
    },
    websiteShort: {
      type: String,
      required: true,
      max: 50,
    },
    websiteHeadings: [
      {
        type: String,
      },
    ],
    friendList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: this,
      },
    ],
  },
  {
    timestamps: true,
  }
);

memberSchema.virtual("friends", {
  ref: "Member",
  localField: "friendList",
  foreignField: "_id",
});

module.exports = mongoose.model("Member", memberSchema);
