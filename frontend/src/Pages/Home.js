import Upcoming from "./Upcoming";
const Home = ({
  interviews,
  update,
  setUpdate,
  participants,
  loading,
  setLoading,
}) => {
  return (
    <>
      <Upcoming
        interviews={interviews}
        setUpdate={setUpdate}
        update={update}
        participants={participants}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default Home;
