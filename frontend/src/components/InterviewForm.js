import { useState } from "react";
import Participants from "./Partcipants";
import Spinner from "./Spinner";
const InterviewForm = ({
  className,
  participants,
  update,
  setUpdate,
  interview,
  updateInterview,
}) => {
  let particpantToUpdate = [];

  if (interview) {
    for (var i = 0; i < interview.participants.length; i++) {
      particpantToUpdate.push(interview.participants[i]._id);
    }
  }
  const [addedParticipants, setAddedParticipants] = useState(
    particpantToUpdate || []
  );
  const [startDateTime, setStartDateTime] = useState(
    interview?.startTime || null
  );
  const [endDateTime, setEndDateTime] = useState(interview?.endTime || null);
  const [title, setTitle] = useState(interview?.title || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ type: null, message: null });

  const getTimeDifference = (start, end) => {
    // get startTime and endTime difference in minutes
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    return diffInMinutes;
  };

  const handleChangeInterview = (iid) => {
    // handle new interview and interview updation
    if (getTimeDifference(startDateTime, endDateTime) > 360) {
      // check if interviews are longer than 6 hours
      setResult({
        // setup error messgae
        type: "error",
        message: "Interview Duration is greater than 6 hours",
      });
      return;
    }
    let todayDateTime = new Date();
    let startDateTimeTc = new Date(startDateTime);
    if (startDateTimeTc < todayDateTime) {
      // check if start time is not older than today
      setResult({
        type: "error",
        message: "You can not schedule interviews in the past.",
      });
      return;
    }
    setLoading(true); // set laoding true
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      startTime: startDateTime,
      endTime: endDateTime,
      participants: addedParticipants,
    });

    var requestOptions = {
      method: updateInterview ? "PUT" : "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = `${process.env.REACT_APP_BACKEND}/api/interview/${
      updateInterview ? `update/${iid}` : "new"
    }`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result?.success && result?.message === "CREATED") {
          // if interview is created
          setResult({ type: "success", message: "Interview Created" });
          setUpdate((update) => update + 1);
          return;
        } else if (result?.success && result?.message === "UPDATED") {
          // if interview is updated
          setResult({ type: "success", message: "Interview Updated" });
          setUpdate((update) => update + 1);
        } else if (!result?.success && result?.message === "CLASH") {
          // if there are un-avl participants
          //let message = "";
          // for (var i = 0; i < result?.unAvalibleParticipants.length; i++) {
          //   message += `${result?.unAvalibleParticipants[i]?.name} - (${result?.unAvalibleParticipants[i]?.startTime}-${result?.unAvalibleParticipants[i]?.endTime})   `;
          // }
          setResult({
            // set up error message
            type: "error",
            message: "Not Available",
            unAvlParticipants: result?.unAvalibleParticipants,
          });
          return;
        } else if (
          // if participants are less than 2
          !result?.success &&
          result?.message === "LESS_PARTICIPANTS"
        ) {
          setResult({
            type: "error",
            message: "Number of participants can not be less than 2.",
          });
          return;
        } else if (!result?.success && result?.message === "DATE_ERROR") {
          // if date validation fails
          setResult({
            type: "error",
            message: "Enter Correct Date Time",
          });
          return;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  return (
    <form className={className}>
      {result && (
        <>
          {result.type === "success" && (
            <div className="text-green-600 bg-green-300 p-2 rounded">
              {result.message}
            </div>
          )}
          {result.type === "error" && (
            <div className="text-white bg-red-600 p-2 rounded-xl font-bold">
              {result.message}
              {result?.unAvlParticipants?.map((pt) => {
                return (
                  <li>
                    {pt.name} - {pt.startTime} - {pt.endTime}
                  </li>
                );
              })}
            </div>
          )}
        </>
      )}
      <div className="mb-6">
        <label
          htmlFor="text"
          className="block mb-2 text-md font-medium text-gray-900"
        >
          Interview Title
        </label>
        <input
          type="text"
          id="interview-title"
          className="bg-gray-50 border border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Full Stack Developer - Round 1"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <label
            htmlFor="text"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Start Time
          </label>
          <input
            className="bg-gray-50 border border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="datetime-local"
            id="start-time"
            name="start-time"
            onChange={(e) => setStartDateTime(e.target.value)}
            value={startDateTime}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="text"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            End Time
          </label>
          <input
            className="bg-gray-50 border border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="datetime-local"
            id="end-time"
            name="end-time"
            onChange={(e) => setEndDateTime(e.target.value)}
            value={endDateTime}
          />
        </div>
      </div>
      {startDateTime && endDateTime && (
        <div>
          <p className="mb-2 text-xs font-medium text-blue-800 p-0.5">
            Interview Duration{" "}
            <span>{getTimeDifference(startDateTime, endDateTime)} Minutes</span>
          </p>
        </div>
      )}
      <div className="mt-6">
        <p className="text-md font-medium text-gray-900">Add Participants</p>
        <Participants
          participants={participants}
          setAddedParticipants={setAddedParticipants}
          addedParticipants={addedParticipants}
        />
      </div>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => handleChangeInterview(interview._id || null)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <Spinner /> : updateInterview ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default InterviewForm;
