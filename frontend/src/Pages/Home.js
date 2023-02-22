import Upcoming from "./Upcoming";
const Home = ({ interviews }) => {
  return (
    <>
      This is home page <Upcoming interviews={interviews} />
    </>
  );
};

export default Home;
