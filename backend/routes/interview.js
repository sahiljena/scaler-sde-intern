const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Interview = require("../models/Interview");
const nodemailer = require("nodemailer");
const { rawListeners } = require("../models/Participant");

const smtpTransport = nodemailer.createTransport({
  // setup gmailer service
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
    // find all participants details to send mail to
    _id: { $in: participants },
  });
  console.log(sendMailsTo);
  for (var i = 0; i < sendMailsTo.length; i++) {
    // tarverse through and send mail one by one
    const mailOptions = {
      from: "find.roomy.otp@gmail.com",
      to: sendMailsTo[i].email,
      subject: subject,
      text: context,
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
      // mailing function
      if (error) {
        console.log(error);
      } else {
        console.log("mail sent");
      }
    });
  }
};

function validateTime(start, end) {
  // date time validation
  const startDate = new Date(start);
  const endDate = new Date(end);
  let todayDateTime = new Date();
  if (
    startDate.getTime() > endDate.getTime() || // to check if start time is greater than the end time
    startDate.getTime() < todayDateTime.getTime() // start time should not be in the past
  ) {
    return false;
  }
  return true;
}

router.post("/new", async (req, res) => {
  // basic checks
  if (validateTime(req.body.startTime, req.body.endTime)) {
    // validate date time
    if (req.body.participants.length >= 2) {
      // check no. of particpants
      const intersetingInterviews = await Interview.find(
        // find  overlapping interviews
        {
          $or: [
            { startTime: { $gte: req.body.startTime, $lt: req.body.endTime } },
            { endTime: { $gte: req.body.startTime, $lte: req.body.endTime } },
          ],
        },
        async (err, interviews) => {
          if (err) {
            res.status(400).json({ success: false, message: err }); // if checking fails
          } else {
            let unavalibleParticipants = []; // to find overlapping inetrviews
            for (var i = 0; i < interviews.length; i++) {
              // check if participants are the same or not
              for (var j = 0; j < req.body.participants.length; j++) {
                if (
                  interviews[i].participants.includes(req.body.participants[j])
                ) {
                  let tp = {
                    uid: req.body.participants[j],
                    startTime: interviews[i].startTime,
                    endTime: interviews[i].endTime,
                  };
                  unavalibleParticipants.push(tp); // if same push into an array with their overlaping date time
                }
              }
            }
            if (unavalibleParticipants.length == 0) {
              // if no overlaping interviews then create new interview
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
                      // send mass mail to all participants
                      "Interview Scheduled",
                      "An Interview has been Scheduled for you from " +
                        req.body.startTime +
                        " to " +
                        req.body.endTime,
                      req.body.participants
                    );
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
                  .json({ success: false, message: "ERR_CREATING_INTERVIEW" }); // return for unsuccess full
              }
            } else {
              // if overlaping interviews then find particpant details
              // console.log(unavalibleParticipants);
              const unAvlPartArray = [];
              for (var i = 0; i < unavalibleParticipants.length; i++) {
                unAvlPartArray.push(unavalibleParticipants[i].uid);
              }
              // get thier details from mongoid
              const unAvlParticipantsDetails = await Participant.find({
                _id: { $in: unAvlPartArray },
              });
              // console.log(unAvlParticipantsDetails);
              // update the un-avl participants return structure with details like email,name
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
                // return the error and the un-avl participants
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
        // return if participants less than 2
        success: false,
        message: "LESS_PARTICIPANTS",
      });
    }
  } else {
    res.status(400).json({
      // return if date validation fails
      success: false,
      message: "DATE_ERROR",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allInterviews = await Interview.find(); // find all interviews
    for (var i = 0; i < allInterviews.length; i++) {
      // get the participant details to add into return structure
      let ids = allInterviews[i].participants;
      const participants = await Participant.find({ _id: { $in: ids } });
      allInterviews[i].participants = participants;
    }
    //console.log(allParticpants);
    res.json({ success: true, interviews: allInterviews }); // return with all details
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message }); // return if error
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const deletedInterveiw = await Interview.findOneAndDelete(
    // find the document(interveiw) to delete
    { _id: req.params.id },
    function (err) {
      if (err) {
        console.log("Error");
        res.status(400).json({ success: false, message: "NOT_DELETED" }); // return if deleted
      } else {
        res.status(200).json({ success: true, message: "DELETED" }); // return if not deleted
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

  if (validateTime(req.body.startTime, req.body.endTime)) {
    // validate date and time
    if (req.body.participants.length >= 2) {
      // check for number of participants
      const intersetingInterviews = await Interview.find(
        // find the all overlaping interviews
        {
          $or: [
            { startTime: { $gte: req.body.startTime, $lt: req.body.endTime } },
            { endTime: { $gte: req.body.startTime, $lte: req.body.endTime } },
          ],
        },
        async (err, interviews) => {
          if (err) {
            res.status(400).json({ message: err }); // return on finding error while finding overlapping interveiws
          } else {
            //console.log(interviews);
            if (
              (interviews.length === 1 && interviews[0]._id == iid) || // check if it is the same interview(one we are trying to update)
              interviews.length === 0 // check if there are no overlapping interviews
            ) {
              const interview = Interview.findOneAndUpdate(
                // find by _id and update
                { _id: iid },
                req.body,
                function (err, doc) {
                  if (err) return res.send(500, { error: err });
                  sendMassMail(
                    // updation mass mail to all the candidates
                    "Interview Schedule Update",
                    "An Interview Schedule has been updated for you from " +
                      req.body.startTime +
                      " to " +
                      req.body.endTime,
                    req.body.participants
                  );
                  return res
                    .status(202)
                    .json({ success: true, message: "UPDATED" });
                }
              );
            } else {
              // if there are overlapping interviews
              let unavalibleParticipants = [];
              // finding if the participants are the un-avl
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
              // un-avl participants mongoid in an array
              const unAvlPartArray = [];
              for (var i = 0; i < unavalibleParticipants.length; i++) {
                unAvlPartArray.push(unavalibleParticipants[i].uid);
              }
              // un-avl participants details
              const unAvlParticipantsDetails = await Participant.find({
                _id: { $in: unAvlPartArray },
              });

              // console.log(unAvlParticipantsDetails);
              // updating and populating structure with details
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

              // if there are no un-avl cparticipants then update
              if (unavalibleParticipants.length === 0) {
                const interview = Interview.findOneAndUpdate(
                  // find by mongoID and update
                  { _id: iid },
                  req.body,
                  function (err, doc) {
                    if (err) return res.send(500, { error: err });
                    sendMassMail(
                      // mass mail all
                      "Interview Schedule Update",
                      "An Interview Schedule has been updated for you from " +
                        req.body.startTime +
                        " to " +
                        req.body.endTime,
                      req.body.participants
                    );
                    return res // return if updated
                      .status(202)
                      .json({ success: true, message: "UPDATED" });
                  }
                );
              } else {
                console.log(unavalibleParticipants); // return if candidates un-avl
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
        // return if participants less than 2
        success: false,
        message: "LESS_PARTICIPANTS",
      });
    }
  } else {
    res.status(400).json({
      // return if date time validation fails
      success: false,
      message: "DATE_ERROR",
    });
  }
});
module.exports = router;
