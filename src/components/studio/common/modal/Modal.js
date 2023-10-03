import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsModalSearch,
  setIsModalSearch,
} from "../../../../features/studio/modalSlice";

function Modal({ isModal, onClose }) {
  if (!isModal) return null;
  return (
    <div
      className={`${
        isModal ? "bg-black opacity-30 h-full absolute w-full z-[10] " : "a"
      }`}
      onClick={onClose}
    ></div>
  );
}

export default Modal;
