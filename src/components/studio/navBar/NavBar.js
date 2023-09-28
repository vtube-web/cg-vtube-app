import React, { useEffect, useState } from "react";
import Search from "./search/Search";
import MenuAndLogo from "./MenuAndLogo";
import Acount from "./navEnd/NavEnd";

function NavBar() {
  return (
    <div className="py-3 px-4 border-b-0 w-full shadow-sm text-dark bg-[#FFFFFF] relative h-[68]">
      <div className="flex flex-row items-center">
        <MenuAndLogo />
        <div className="flex justify-between flex-auto pr-3">
          <Search />
          <Acount />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
