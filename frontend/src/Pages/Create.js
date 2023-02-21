import InterviewForm from "../components/InterviewForm";
const Create = ({ participants }) => {
  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold">Create an Interview</h1>
        <div className="max-w-3xl m-auto">
          <InterviewForm className="mt-5" participants={participants} />
        </div>
      </div>
    </>
  );
};

export default Create;
