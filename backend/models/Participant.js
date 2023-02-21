const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Participants", dataSchema);
