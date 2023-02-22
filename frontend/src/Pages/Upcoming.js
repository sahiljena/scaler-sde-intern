import { useState } from "react";
import Spinner from "../components/Spinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
const Upcoming = ({ interviews }) => {
  const [showParticpant, setShowParticipant] = useState(false);
  const [participants, setParticipants] = useState([]);

  const Partcipants = () => {
    return (
      <div
        className={`bg-white text-gray-900 rounded-lg fixed top-0 left-0 right-0 z-50 m-auto text-center max-w-2xl  h-36 border  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 ${
          !showParticpant && "hidden"
        }`}
      >
        <p className="text-xl font-bold text-center">Particpants</p>

        {participants?.map((participant) => {
          return <li className="text-left">{participant.name}</li>;
        })}
        <button onClick={() => setShowParticipant(false)}>Close</button>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="p-2">
          <h1 className="text-2xl font-bold">Upcoming Interviews</h1>

          <div className="max-w-4xl m-auto">
            {!interviews && <Spinner />}
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                <tbody>
                  {interviews?.map((interview) => {
                    return (
                      <tr className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {interview.title}
                        </th>
                        <td className="px-6 py-4">{interview.startTime}</td>
                        <td className="px-6 py-4">{interview.endTime}</td>
                        <td className="px-6 py-4 flex gap-4">
                          <Partcipants />

                          <button
                            className="text-xs block"
                            onClick={() => {
                              setShowParticipant(true);
                              setParticipants(interview.participants);
                            }}
                          >
                            <IoIosPeople className="text-2xl text-yellow-400" />
                          </button>
                          <button>
                            <AiFillEdit className="text-2xl text-blue-600" />
                          </button>
                          <button>
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
