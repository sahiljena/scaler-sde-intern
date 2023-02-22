const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

router.get("/all", async (req, res) => {
  try {
    const allParticpants = await Participant.find();
    //console.log(allParticpants);
    res.json(allParticpants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
