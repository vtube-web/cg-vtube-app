import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsModalSearch,
  setIsModalSearch,
} from "../../../../features/studio/studioSlice";

function Modal() {
  const statusThemeSreach = useSelector(getIsModalSearch);
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(setIsModalSearch(false));
  };
  return (
    <div
      className={`${
        statusThemeSreach
          ? "bg-black opacity-30 h-full absolute w-full z-[10] "
          : ""
      }`}
      onClick={handleTheme}
    ></div>
  );
}

export default Modal;
