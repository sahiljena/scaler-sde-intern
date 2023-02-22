import Upcoming from "./Upcoming";
const Update = ({ interviews, update, setUpdate, participants }) => {
  return (
    <>
      <Upcoming
        participants={participants}
        interviews={interviews}
        setUpdate={setUpdate}
        update={update}
      />
    </>
  );
};

export default Update;
