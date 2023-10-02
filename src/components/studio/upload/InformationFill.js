import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { addVideoList } from "../../../features/studio/videoUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function InformationFill({ onClose }) {
  const [uploadStatus, setUploadStatus] = useState(false);
  const dispatch = useDispatch();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUUID = uuidv4();
      let fileUpload = {
        name: newUUID,
        file: file,
      };
      setUploadStatus(true);
      dispatch(addVideoList(fileUpload));
      setTimeout(() => {
        setUploadStatus(false);
      }, 2000);
    }
  };
  return (
    <div className="h-full">
      <div className="px-6 h-[13%] py-3 border-b-[1px] border-gray-200 flex flex-none justify-between items-center">
        <div className="text-xl font-semibold">
          Document Google Chrome 2023 04 20 16 35 54
        </div>
        <div
          className="text-2xl text-gray-300 hover:cursor-pointer hover:text-gray-500"
          onClick={onClose}
        >
          ✖
        </div>
      </div>
      <div className="flex justify-center h-[87%] ">
        <div className=" flex flex-col w-[90%] py-4">
          <div className="text-xl font-bold mb-2">Detail</div>
          <div className="" >
            <textarea
              className=" border-[1px] outline-1 outline-blue-600 w-full"
              rows="3"
              placeholder="details"
              id="title"
            />
            <label for="title">Example textarea</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationFill;
