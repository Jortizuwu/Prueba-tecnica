import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiShowSidebar } from "../../actions/ui";
import Sidebar from "./Sidebar";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.ui);

  return (
    <div className="flex w-full bg-gray-100">
      <Sidebar />

      <div className="flex flex-col justify-center items-center w-full md:w-full relative h-screen overflow-y-scroll">
        <button
          onClick={() => {
            dispatch(uiShowSidebar());
          }}
          className={`${
            showSidebar ? "z-0" : "z-10"
          }  block md:hidden absolute btn bg-blue-400 top-5 left-5 text-white`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};
