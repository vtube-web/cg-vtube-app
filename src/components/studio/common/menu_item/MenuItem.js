import React, { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
function MenuItem({ menu, isVisibilityMenu }) {
  const [mouseMenu, setMouseMenu] = useState(false);
 
  const match = useMatch({
    path: menu.to,
    exact: true,
  });
  const isActive = match !== null;
  return (
    <>
      <NavLink
        to={menu.to}
        className={
          isActive
            ? "border-red-500 text-red-500 py-3 flex space-x-6 items-center border-l-4 bg-gray-100 mr-[2px]"
            : "py-3 flex space-x-6 items-center pl-1 hover:bg-gray-100 hover:mr-[2px]"
        }
        onMouseOver={() => setMouseMenu(true)}
        onMouseOut={() => setMouseMenu(false)}
      >
        {React.createElement(menu?.icon, {
          className: ` w-7 h-7 ${isVisibilityMenu ? "col-12" : "col-2"}`,
        })}
        {React.createElement(
          "div",
          {
            className: ` whitespace-pre font-[550] duration-500 ${
              isVisibilityMenu ? "hidden" : "overflow-hidden overflow-x-0"
            }`,
          },
          menu?.label
        )}
      </NavLink>
      {mouseMenu == false ? (
        <></>
      ) : (
        <div
          className={` z-10  whitespace-nowrap  rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px] ${
            isVisibilityMenu
              ? `absolute  top-[${menu.distanceTop}] mt-2`
              : "hidden"
          }`}
        >
          {menu.label}
        </div>
      )}
    </>
  );
}

export default MenuItem;
