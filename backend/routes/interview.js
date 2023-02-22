const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Interview = require("../models/Interview");

function validateInterview(start, end, participants) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate.getTime() > endDate.getTime() || participants.length < 2) {
    return false;
  }
  return true;
}

router.post("/new", async (req, res) => {
  // basic checks
  if (
    validateInterview(
      req.body.startTime,
      req.body.endTime,
      req.body.participants
    )
  ) {
    const intersetingInterviews = await Interview.find(
      {
        $or: [
          { startTime: { $gte: req.body.startTime, $lt: req.body.endTime } },
          { endTime: { $gt: req.body.startTime, $lte: req.body.endTime } },
        ],
      },
      async (err, interviews) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          let unavalibleParticipants = [];
          for (var i = 0; i < interviews.length; i++) {
            for (var j = 0; j < req.body.participants.length; j++) {
              if (
                interviews[i].participants.includes(req.body.participants[j])
              ) {
                unavalibleParticipants.push(req.body.participants[j]);
              }
            }
          }
          if (unavalibleParticipants.length == 0) {
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
                  res.status(201).json({
                    success: true,
                    message: "CREATED",
                  });
                })
                .catch((error) => {
                  res.status(400).json({ message: error });
                });
            } catch (error) {
              res
                .status(400)
                .json({ success: false, message: "ERR_CREATING_INTERVIEW" });
            }
          } else {
            console.log(unavalibleParticipants);
            const unAvlParticipants = await Participant.find({
              _id: { $in: unavalibleParticipants },
            });
            console.log(unAvlParticipants);
            res.status(400).json({
              success: false,
              message: "CLASH",
              unavalibleParticipants: unAvlParticipants,
            });
          }
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } else {
    res.status(400).json({
      success: false,
      message: "BASIC_VALIDATION_FAILED",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allInterviews = await Interview.find();
    for (var i = 0; i < allInterviews.length; i++) {
      let ids = allInterviews[i].participants;
      const participants = await Participant.find({ _id: { $in: ids } });
      allInterviews[i].participants = participants;
    }
    //console.log(allParticpants);
    res.json({ success: true, interviews: allInterviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
