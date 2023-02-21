const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Interview = require("../models/Interview");

function validateDateTime(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate.getTime() > endDate.getTime()) {
    return false;
  }
  return true;
}

function validateParticpants(participants) {
  return true;
}

router.post("/new", (req, res) => {
  // basic checks
  if (
    validateDateTime(req.body.startTime, req.body.endTime) &&
    validateParticpants(req.body.participants)
  ) {
    const interview = new Interview({
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      link: req.body.link,
      participants: req.body.participants,
    });
    try {
      interview
        .save()
        .then(() => {
          res.status(201).send({
            message: "Interview Added Successfully",
          });
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } else {
    res
      .status(400)
      .json({ message: "Start date-time should be less than end date-time" });
  }
});

module.exports = router;
