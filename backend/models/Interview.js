const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  startTime: {
    required: true,
    type: String,
  },
  endTime: {
    required: true,
    type: String,
  },
  link: {
    required: false,
    type: String,
  },
  participants: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model("Interviews", dataSchema);
