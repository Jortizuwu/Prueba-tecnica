import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiShowSidebar } from "../../actions/ui";
import { LinkComponent } from "../LinkComponent";

const Sidebar = () => {
  const { showSidebar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <>
      <aside className="bg-primary max-w-xs w-full hidden md:block md:w-3/12 h-screen px-3 py-2 ">
        <p className="text-white font-bold uppercase text-center mt-2 text-lg mb-14">
          Sistema de facturas
        </p>
        <div className="flex flex-col space-y-4">
          <LinkComponent pathnameLink="/" name="Home" />
          <LinkComponent pathnameLink="/clientes" name="Clientes" />
          <LinkComponent pathnameLink="/facturas" name="Facturas" />
        </div>
      </aside>
      {showSidebar && (
        <aside className="bg-primary absolute z-10 w-9/12 md:hidden h-screen px-3 py-2 ">
          <div className="flex flex-row items-center justify-between mt-2 mb-14">
            <p className="text-white font-bold uppercase text-center text-lg ">
              Sistema de facturas
            </p>
            <button
              onClick={() => {
                dispatch(uiShowSidebar());
              }}
              className="btn bg-blue-400 text-white"
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <LinkComponent pathnameLink="/" name="Home" />
            <LinkComponent pathnameLink="/clientes" name="Clientes" />
            <LinkComponent pathnameLink="/facturas" name="Facturas" />
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
