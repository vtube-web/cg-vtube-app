import React, { useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { BsBoxArrowUpRight, BsPlayBtn } from "react-icons/bs";
import {HiSquares2X2} from 'react-icons/hi2';
import {AiOutlinePlaySquare} from "react-icons/ai";
import {
  MdOutlineInsertComment,
  MdOutlineDataThresholding,
} from "react-icons/md";
import {PiMagicWandDuotone} from "react-icons/pi";
import MenuItem from '../common/menuItem/MenuItem';
import "../../../assets/css/studio/studioLayout.css";

function SiderBar() {
  const [mouseAvatar,setMouseAvatar] = useState(false);
  const {channelId} = useParams();
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
      <div className="text-center mt-3 mb-4 ">
        <div className="text-gray-600 font-semibold text-sm">Channel your</div>
        <div className="text-xs mt-1">Bố nè</div>
      </div>
      <MenuItem
        to={`/channel/${channelId}`}
        label="Overview page"
        icon={<HiSquares2X2 className="col-2 w-7 h-7 " />}
      />
      <MenuItem
        to={`/channel/${channelId}/content`}
        label="Content"
        icon={<AiOutlinePlaySquare className="col-2 w-7 h-7 " />}
      />
      <MenuItem
        to={`/channel/${channelId}/analytical`}
        label="Analytical data"
        icon={<MdOutlineDataThresholding className="col-2 w-7 h-7 " />}
      />
      <MenuItem
        to={`/channel/${channelId}/comment`}
        label="Comment"
        icon={<MdOutlineInsertComment className="col-2 w-7 h-7 " />}
      />
      <MenuItem
        to={`/channel/${channelId}/customize`}
        label="Customize channels"
        icon={<PiMagicWandDuotone className="col-2 w-7 h-7 " />}
      />
    </div>
  );
}

export default SiderBar;