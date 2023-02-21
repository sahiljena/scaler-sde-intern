import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
