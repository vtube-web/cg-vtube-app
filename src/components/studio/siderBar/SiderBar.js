import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {HiSquares2X2} from 'react-icons/hi2';
import "../../../assets/css/studio/studioLayout.css";

function SiderBar() {
  const [mouseAvatar,setMouseAvatar] = useState(false);
  return (
    <div className="bg-[#FFFFFF] col-2 py-4 justify-center border-r-2">
      <div
        className="flex justify-center relative "
        onMouseOver={() => setMouseAvatar(true)}
        onMouseOut={() => setMouseAvatar(false)}
      >
        <img
          className="w-28 h-28 border rounded-full flex-none hover:cursor-pointer"
          src="https://antimatter.vn/wp-content/uploads/2022/11/hinh-anh-gai-xinh-trung-quoc.jpg"
          alt="avatar"
        />
        {mouseAvatar == false ? (
          <></>
        ) : (
          <>
            <div className="bg-black opacity-40 absolute w-28 h-28 rounded-full hover:cursor-pointer">
              <BsBoxArrowUpRight className="absolute w-6 h-6 top-[37%] right-[37%]" />
            </div>
            <div className="absolute z-10 top-[96px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
              Watch your channel vtube
            </div>
          </>
        )}
      </div>
      <div className="text-center my-3 ">
        <div className="text-gray-600 font-semibold text-sm">Channel your</div>
        <div className="text-xs mt-1">Bố nè</div>
      </div>
      <NavLink
        to={`/channel`}
        className={({ isActive }) =>
          isActive
            ? "border-red-500 text-red-500 py-2 flex space-x-6 items-center border-l-4 bg-gray-100"
            : "py-2 flex space-x-6 items-center pl-1 hover:bg-gray-100"
        }
      >
        <HiSquares2X2 className="col-2 w-8 h-8 " />
        <div className="col-auto font-semibold">Overview page</div>
      </NavLink>
      <NavLink
        to={`/content`}
        className={({ isActive }) =>
          isActive
            ? "border-red-500 text-red-500 py-2 flex space-x-6 items-center border-l-4 bg-gray-100"
            : "py-2 flex space-x-6 items-center pl-1 hover:bg-gray-100"
        }
      >
        <HiSquares2X2 className="col-2 w-8 h-8 " />
        <div className="col-auto font-semibold">Content</div>
      </NavLink>
      <div>aaa</div>
      <div>aaa</div>
    </div>
  );
}

export default SiderBar;