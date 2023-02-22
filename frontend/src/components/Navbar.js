import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdUpcoming, MdClose } from "react-icons/md";
import { BsCalendarPlusFill, BsPencilSquare } from "react-icons/bs";
const Navbar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
          open ? "-translate-x-full" : "translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        {/* <button
          onClick={() => setOpen(!open)}
          className=" visible mt-6 text-lg font-medium bg-red-600 text-white text-center p-2 leading-none rounded-full  absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0"
        >
          X
        </button> */}
        <button
          onClick={() => setOpen(!open)}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-5 mr-20- text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute -translate-y-1/2 translate-x-12 left-auto top-3 right-0 bg-gray-100"
        >
          {!open ? (
            <MdClose className="text-2xl" />
          ) : (
            <>
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </>
          )}
        </button>
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-900">
          <ul className="space-y-2">
            <li>
              <div className="container flex flex-wrap items-center justify-between mx-auto p-1">
                <a href="/" className="flex items-center">
                  <img
                    src="https://assets.scaler.com/assets/scaler/svg/logo-by-ib-056ab22f1a6547d6d9a6896f0048a4cb5d4c6cc7bfa6f2a0f27bb8e265c95bd3.svg.gz"
                    className="h-12 m-2 bg-white p-2 rounded px-10"
                    alt="scaler-logo"
                  />
                </a>
              </div>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal rounded-lg text-white bg-blue-800"
                    : "flex items-center p-2 text-base font-normal rounded-lg text-white  hover:bg-blue-800 "
                }
              >
                <MdUpcoming className="text-xl" />
                <span className="ml-3">Upcoming Interviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal rounded-lg text-white bg-blue-800"
                    : "flex items-center p-2 text-base font-normal rounded-lg text-white  hover:bg-blue-800 "
                }
                to="/create"
              >
                <BsCalendarPlusFill className="text-xl" />
                <span className="ml-3">Create Interviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal rounded-lg text-white  bg-blue-800"
                    : "flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-blue-800 "
                }
                to="/update"
              >
                <BsPencilSquare className="text-lg" />
                <span className="ml-3">Update Interviews</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded border border-b shadow-lg">
        <div className="p-4 sm:ml-64">
          <div className="container flex flex-wrap items-center justify-between mx-auto p-1">
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/6vPwXhP/scaler-logo.webp"
                className="h-3 mr-3 sm:h-9"
                alt="scaler-logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Scaler Interview Management
              </span>
            </a>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-blue-600">
                Interview Management Portal
              </h1>
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
