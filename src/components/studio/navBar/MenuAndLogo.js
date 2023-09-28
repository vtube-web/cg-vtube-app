import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function MenuAndLogo() {
  const [mouseMenu, setMouseMenu] = useState(false);
  const [mouseLogo, setMouseLogo] = useState(false);

  return (
    <div className="col-4 flex justify-start items-center space-x-6">
      <div
        className="relative h-6 w-6 flex-none"
        onMouseOver={() => setMouseMenu(true)}
        onMouseOut={() => setMouseMenu(false)}
      >
        <AiOutlineMenu className="text-xl hover:cursor-pointer pointer-events-none" />
        {mouseMenu == false ? (
          <></>
        ) : (
          <div className="absolute z-10 top-[67px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
            Expand menu
          </div>
        )}
      </div>
      <div className="relative">
        <img
          className="bg-dark h-8 object-fill rounded-sm"
          src="https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png"
          alt="logo"
          onMouseOver={() => setMouseLogo(true)}
          onMouseOut={() => setMouseLogo(false)}
        />
        {mouseLogo == false ? (
          <></>
        ) : (
          <div className="absolute z-10 top-[67px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
            Overview page vtube studio
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuAndLogo;
