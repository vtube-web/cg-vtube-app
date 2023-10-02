import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BsBoxArrowUpRight, BsPlayBtn } from "react-icons/bs";
import { HiSquares2X2 } from "react-icons/hi2";
import { AiOutlinePlaySquare } from "react-icons/ai";
import {
  MdOutlineInsertComment,
  MdOutlineDataThresholding,
} from "react-icons/md";
import { PiMagicWandDuotone } from "react-icons/pi";
import MenuItem from "../common/menuItem/MenuItem";
import "../../../assets/css/studio/studioLayout.css";
import {
  getIsVisibilityMenu,
  setIsVisibilityMenu,
} from "../../../features/studio/visibilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { getIsModalMenu } from "../../../features/studio/modalSlice";
function SiderBar() {
  const [mouseAvatar, setMouseAvatar] = useState(false);
  const { channelId } = useParams();
  const pathAcountDefault = `/channel/${channelId}`;
  const isVisibilityMenu = useSelector(getIsVisibilityMenu);
  const [width, setWidth] = useState();
  const isModalMenu = useSelector(getIsModalMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (width < 1536) {
      dispatch(setIsVisibilityMenu(true));
    } else {
      dispatch(setIsVisibilityMenu(false));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  const menus = [
    {
      to: pathAcountDefault,
      label: "Overview page",
      icon: HiSquares2X2,
      distanceTop: "35%",
    },
    {
      to: `${pathAcountDefault}/content`,
      label: "Content",
      icon: AiOutlinePlaySquare,
      distanceTop: "47%",
    },
    {
      to: `${pathAcountDefault}/analytical`,
      label: "Analytical data",
      icon: MdOutlineDataThresholding,
      distanceTop: "70%",
    },
    {
      to: `${pathAcountDefault}/comment`,
      label: "Comment",
      icon: MdOutlineInsertComment,
      distanceTop: "80%",
    },
    {
      to: `${pathAcountDefault}/customize`,
      label: "Customize channel",
      icon: PiMagicWandDuotone,
      distanceTop: "80%",
    },
  ];
  return (
    <div
      className={`bg-[#FFFFFF] py-4 justify-center border-r-2 border-gray-200 duration-500 transition-all flex-none flex flex-nowrap${
        isModalMenu ? " z-20" : ""
      } ${
        isVisibilityMenu && isModalMenu == false
          ? "w-[80px] ease-out"
          : `grow  ease-in ${width < 1200 ? "col-3 " : "col-2"}`
      }`}
    >
      <div
        className={`absolute left-0 top-1/5 duration-500 transition-all  ${
          isVisibilityMenu && isModalMenu == false
            ? "w-[80px] ease-out"
            : `grow  ease-in ${width < 1200 ? "col-3" : "col-2"}`
        }`}
      >
        <div
          className={`flex justify-center ${
            isVisibilityMenu ? "" : "relative"
          }`}
          onMouseOver={() => setMouseAvatar(true)}
          onMouseOut={() => setMouseAvatar(false)}
        >
          <img
            className={`border rounded-full flex-none hover:cursor-pointer ${
              isVisibilityMenu ? "w-12 h-12 mx-3" : "w-28 h-28 "
            }`}
            src="https://antimatter.vn/wp-content/uploads/2022/11/hinh-anh-gai-xinh-trung-quoc.jpg"
            alt="avatar"
          />
          {mouseAvatar == false ? (
            <></>
          ) : (
            <>
              <div
                className={`bg-black opacity-40 absolute rounded-full hover:cursor-pointer  ${
                  isVisibilityMenu ? "w-12 h-12" : "w-28 h-28"
                }`}
              >
                <BsBoxArrowUpRight
                  className={`absolute ${
                    isVisibilityMenu
                      ? "w-4 h-4 right-[33%] top-[33%]"
                      : "right-[37%] top-[37%] w-6 h-6"
                  }`}
                />
              </div>
              <div
                className={`absolute z-10 top-[96px] whitespace-nowrap rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px] ${
                  isVisibilityMenu
                    ? "left-0 top-[35%]"
                    : "left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                }`}
              >
                Watch your channel vtube
              </div>
            </>
          )}
        </div>
        <div className="text-center mt-3 mb-4 shrink ">
          {isVisibilityMenu ? (
            <></>
          ) : (
            <>
              <div className="text-gray-600 font-semibold text-sm ">
                Channel your
              </div>
              <div className="text-xs mt-1">Bố nè</div>
            </>
          )}
        </div>
        {menus?.map((menu, i) => (
          <MenuItem key={i} menu={menu} isVisibilityMenu={isVisibilityMenu} />
        ))}
      </div>
    </div>
  );
}

export default SiderBar;