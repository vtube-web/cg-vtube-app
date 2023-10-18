import React from "react";
import { NavLink, useMatch } from "react-router-dom";

function MenuItemChill({ menu }) {
  const match = useMatch({
    path: menu.to,
    exact: true,
  });
  
  const isActive = match !== null;
  return (
    <>
      <div className="">
        <NavLink to={menu.to} className={isActive ? "" : ""}>
          <div
            className={`px-1 font-semibold ${
              isActive ? "text-blue-600" : ""
            }`}
          >
            {menu.title}
          </div>
          <div
            className={`border-b-[3px] mt-2 rounded-t-full ${isActive ? "border-blue-600" : "invisible"}`}
          ></div>
        </NavLink>
      </div>
    </>
  );
}

export default MenuItemChill;
