import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import InterviewForm from "./InterviewForm";
const UpdateInterview = ({
  participants,
  interview,
  updateInterview,
  update,
  setUpdate,
}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <button onClick={() => setCollapse(true)}>
        <AiFillEdit className="text-2xl text-blue-600" />
      </button>

      <div
        className={`shadow-2xl bg-gray-50 text-gray-900 rounded-lg fixed top-0 left-0 right-0 z-50 m-auto max-w-5xl  h-11/12 border mt-10 mb-10  w-full p-4 overflow-auto inset-0 ${
          !collapse && "hidden"
        }`}
      >
        <p className="text-xl font-bold text-center">Update Interview</p>

        <InterviewForm
          participants={participants}
          interview={interview}
          updateInterview={true}
          update={update}
          setUpdate={setUpdate}
        />
        <button
          className="bg-red-600 text-white rounded px-3 py-2 inline-flex"
          onClick={() => setCollapse(false)}
        >
          Close
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default UpdateInterview;
