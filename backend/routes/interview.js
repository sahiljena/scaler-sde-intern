const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Interview = require("../models/Interview");
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "find.roomy.otp@gmail.com",
    pass: "wlvfoikfgpcjanah",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMassMail = async (subject, context, participants) => {
  const sendMailsTo = await Participant.find({
    _id: { $in: participants },
  });
  console.log(sendMailsTo);
  for (var i = 0; i < sendMailsTo.length; i++) {
    const mailOptions = {
      from: "find.roomy.otp@gmail.com",
      to: sendMailsTo[i].email,
      subject: subject,
      text: context,
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail sent");
      }
    });
  }
};

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
                let tp = {
                  uid: req.body.participants[j],
                  startTime: interviews[i].startTime,
                  endTime: interviews[i].endTime,
                };
                unavalibleParticipants.push(tp);
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
                  sendMassMail(
                    "Interview Scheduled",
                    "An Interview has been Scheduled for you from " +
                      req.body.startTime +
                      " to " +
                      req.body.endTime,
                    req.body.participants
                  );
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
            // console.log(unavalibleParticipants);
            const unAvlPartArray = [];
            for (var i = 0; i < unavalibleParticipants.length; i++) {
              unAvlPartArray.push(unavalibleParticipants[i].uid);
            }
            const unAvlParticipantsDetails = await Participant.find({
              _id: { $in: unAvlPartArray },
            });
            // console.log(unAvlParticipantsDetails);
            for (var i = 0; i < unAvlParticipantsDetails.length; i++) {
              for (var j = 0; j < unavalibleParticipants.length; j++) {
                if (
                  unAvlParticipantsDetails[i]._id.toString() ===
                  unavalibleParticipants[j].uid
                ) {
                  unavalibleParticipants[j].name =
                    unAvlParticipantsDetails[i].name;
                  unavalibleParticipants[j].email =
                    unAvlParticipantsDetails[i].email;
                }
              }
            }
            console.log(unavalibleParticipants);
            res.status(400).json({
              success: false,
              message: "CLASH",
              unAvalibleParticipants: unavalibleParticipants,
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

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const deletedInterveiw = await Interview.findOneAndDelete(
    { _id: req.params.id },
    function (err) {
      if (err) {
        console.log("Error");
        res.status(400).json({ success: false, message: "NOT_DELETED" });
      } else {
        res.status(200).json({ success: true, message: "DELETED" });
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.put("/update/:id", async (req, res) => {
  const iid = req.params.id;

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
          console.log(interviews);
          if (
            (interviews.length === 1 && interviews[0]._id == iid) ||
            interviews.length === 0
          ) {
            const interview = Interview.findOneAndUpdate(
              { _id: iid },
              req.body,
              function (err, doc) {
                if (err) return res.send(500, { error: err });
                return res
                  .status(202)
                  .json({ success: true, message: "UPDATED" });
              }
            );
          } else {
            let unavalibleParticipants = [];
            for (var i = 0; i < interviews.length; i++) {
              for (var j = 0; j < req.body.participants.length; j++) {
                if (
                  interviews[i].participants.includes(
                    req.body.participants[j]
                  ) &&
                  interviews[i]._id != iid
                ) {
                  let tp = {
                    uid: req.body.participants[j],
                    startTime: interviews[i].startTime,
                    endTime: interviews[i].endTime,
                  };
                  unavalibleParticipants.push(tp);
                }
              }
            }
            const unAvlPartArray = [];
            for (var i = 0; i < unavalibleParticipants.length; i++) {
              unAvlPartArray.push(unavalibleParticipants[i].uid);
            }
            const unAvlParticipantsDetails = await Participant.find({
              _id: { $in: unAvlPartArray },
            });
            // console.log(unAvlParticipantsDetails);
            for (var i = 0; i < unAvlParticipantsDetails.length; i++) {
              for (var j = 0; j < unavalibleParticipants.length; j++) {
                if (
                  unAvlParticipantsDetails[i]._id.toString() ===
                  unavalibleParticipants[j].uid
                ) {
                  unavalibleParticipants[j].name =
                    unAvlParticipantsDetails[i].name;
                  unavalibleParticipants[j].email =
                    unAvlParticipantsDetails[i].email;
                }
              }
            }

            if (unavalibleParticipants.length === 0) {
              const interview = Interview.findOneAndUpdate(
                { _id: iid },
                req.body,
                function (err, doc) {
                  if (err) return res.send(500, { error: err });
                  return res
                    .status(202)
                    .json({ success: true, message: "UPDATED" });
                }
              );
            } else {
              console.log(unavalibleParticipants);
              res.status(400).json({
                success: false,
                message: "CLASH",
                unAvalibleParticipants: unavalibleParticipants,
              });
            }
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
module.exports = router;
