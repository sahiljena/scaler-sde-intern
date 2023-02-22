import { useState } from "react";
import UpdateInterview from "../components/UpdateInterveiw";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import Create from "./Create";
const Upcoming = ({
  interviews,
  update,
  setUpdate,
  participants,
  loading,
  setLoading,
}) => {
  const [showParticpant, setShowParticipant] = useState(false);
  const [interviewParticipants, setInterviewParticipants] = useState([]);

  const handleDelete = (id) => {
    setLoading(true);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/api/interview/delete/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        if (result.success) {
          setUpdate((update) => update + 1);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const Partcipants = () => {
    return (
      <div
        className={`shadow-2xl bg-gray-50 text-gray-900 rounded-lg fixed top-0 left-0 right-0 z-50 m-auto text-center max-w-2xl  h-8/12  mt-10 mb-10 border  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 ${
          !showParticpant && "hidden"
        }`}
      >
        <p className="text-xl font-bold text-center">Participants</p>

        {interviewParticipants?.map((participant) => {
          return <li className="text-left">{participant.name}</li>;
        })}
        <button
          className="bg-red-600 text-white rounded p-1"
          onClick={() => setShowParticipant(false)}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="p-2">
          <h1 className="text-2xl font-bold">Upcoming Interviews</h1>

          <div className="max-w-4xl m-auto">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                {interviews.length === 0 && "No Upcomign Interviews"}
                <tbody>
                  {loading && <>loading...</>}
                  {interviews?.map((interview) => {
                    return (
                      <tr className="bg-white border-b " key={interview._id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {interview.title}
                        </th>
                        <td className="px-6 py-4 text-gray-600">
                          {interview?.startTime.split("T")[0]} -{" "}
                          {interview?.startTime.split("T")[1]}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {interview?.endTime.split("T")[0]} -{" "}
                          {interview?.endTime.split("T")[1]}
                        </td>
                        <td className="px-6 py-4 flex gap-4">
                          <Partcipants />

                          <button
                            className="text-xs block"
                            onClick={() => {
                              setShowParticipant(true);
                              setInterviewParticipants(interview.participants);
                            }}
                          >
                            <IoIosPeople className="text-2xl text-yellow-400" />
                          </button>
                          <UpdateInterview
                            participants={participants}
                            interview={interview}
                            updateInterview={true}
                            update={update}
                            setUpdate={setUpdate}
                          />
                          <button onClick={() => handleDelete(interview._id)}>
                            <AiFillDelete className="text-2xl text-red-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
