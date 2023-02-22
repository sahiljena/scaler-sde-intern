const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

router.get("/all", async (req, res) => {
  try {
    const allParticpants = await Participant.find(); // find all participants
    //console.log(allParticpants);
    res.json(allParticpants); // return found particpants
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // return on error
  }
});

router.post("/new", async (req, res) => {
  const participant = new Participant({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    participant
      .save()
      .then(() => {
        res.status(201).json({
          // return status to success
          success: true,
          message: "CREATED",
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false, message: error }); // return for unsuccess full
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "PARTICIPANT_CREATION_FAILED" }); // return for unsuccess full
  }
});

module.exports = router;
