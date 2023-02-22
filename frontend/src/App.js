import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import Update from "./Pages/Update";
function App() {
  const [participants, setParticpants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [update, setUpdate] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchParticpants = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    //console.log("here");
    fetch(
      `${process.env.REACT_APP_BACKEND}/api/particpants/all`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setParticpants(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchInterviews = () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/api/interview/all`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setInterviews(result?.interviews);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchParticpants();
    fetchInterviews();
  }, [update]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home
                  interviews={interviews}
                  setUpdate={setUpdate}
                  update={update}
                  participants={participants}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="create"
              element={
                <Create
                  setUpdate={setUpdate}
                  update={update}
                  participants={participants}
                />
              }
            />
            <Route
              path="update"
              element={
                <Update
                  interviews={interviews}
                  setUpdate={setUpdate}
                  update={update}
                  participants={participants}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
