import React, { useEffect, useState } from "react";
import Search from "./search/Search";
import MenuAndLogo from "./MenuAndLogo";
import NavEnd from "./navEnd/NavEnd";

function NavBar({isModalMenu}) {
  return (
    <div
      className={`py-3 px-4 border-b-0 w-full shadow-sm text-dark bg-[#FFFFFF] relative h-[68] ${
        isModalMenu ? "z-30" : ""
      }`}
    >
      <div className="flex flex-row items-center">
        <MenuAndLogo />
        <div className="flex justify-between flex-auto pr-3 md:justify-end sm:justify-end">
          <Search />
          <NavEnd />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
