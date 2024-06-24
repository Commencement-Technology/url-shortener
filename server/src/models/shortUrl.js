const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
