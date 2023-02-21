import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import Update from "./Pages/Update";
function App() {
  const [participants, setParticpants] = useState([]);
  const fetchParticpants = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    console.log("here");
    fetch(
      `${process.env.REACT_APP_BACKEND}/api/particpants/all`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setParticpants(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchParticpants();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="create"
              element={<Create participants={participants} />}
            />
            <Route
              path="update"
              element={<Update participants={participants} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
