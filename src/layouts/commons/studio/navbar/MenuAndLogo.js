import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import {
  setIsVisibilityMenu,
  getIsVisibilityMenu,
} from "../../../../features/studio/visibilitySlice";
import {
  setIsModalMenu,
  getIsModalMenu,
} from "../../../../features/studio/modalSlice";
import logo from "../../../../assets/img/logo-vtube.png";
import {useNavigate} from "react-router-dom";
function MenuAndLogo() {
  const [mouseMenu, setMouseMenu] = useState(false);
  const [mouseLogo, setMouseLogo] = useState(false);
  const isVisibilityMenu = useSelector(getIsVisibilityMenu);
  const isModalMenu = useSelector(getIsModalMenu);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const logoImg = logo;

  function handleReturnHome() {
    navigate("/")
  }
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

    const handleMenu = () => {
      if (width >= 1536) {
        dispatch(setIsVisibilityMenu(!isVisibilityMenu));
        dispatch(setIsModalMenu(false));
      } else {
        dispatch(setIsVisibilityMenu(!isVisibilityMenu));
        dispatch(setIsModalMenu(!isModalMenu));
      }
    };
  return (
    <div className="col-4 flex justify-start items-center space-x-6">
      <div
        className="relative col-1 flex-none"
        onMouseOver={() => setMouseMenu(true)}
        onMouseOut={() => setMouseMenu(false)}
        onClick={handleMenu}
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
          className="h-8 object-fill rounded-sm cursor-pointer"
          src={logoImg}
          alt="logo"
          onMouseOver={() => setMouseLogo(true)}
          onMouseOut={() => setMouseLogo(false)}
          onClick={handleReturnHome}
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
