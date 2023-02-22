import Upcoming from "./Upcoming";
const Home = ({ interviews, update, setUpdate, participants }) => {
  return (
    <>
      <Upcoming
        interviews={interviews}
        setUpdate={setUpdate}
        update={update}
        participants={participants}
      />
    </>
  );
};

export default Home;
