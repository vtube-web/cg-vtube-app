import React, { useState } from "react";
import {
  setIsModalUpload,
  getIsModalUpload,
} from "../../features/studio/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../layouts/commons/studio/overview/Upload";
import InformationFill from "../../layouts/commons/studio/overview/InformationFill";
import "../../assets/css/studio/overview-screen.css";
import { ToastContainer } from "react-toastify";
import { setVideo } from "../../features/studio/videoUploadSlice";
import AnalytiscChannel from "../../layouts/commons/studio/overview/AnalytiscChannel";

function OverviewScreen() {
  const isModalUpload = useSelector(getIsModalUpload);
  const [stepUpload, setStepUpload] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
    setStepUpload(false);
    dispatch(setIsModalUpload(false));
    dispatch(setVideo({}));
  };
  const dispatch = useDispatch();
  return (
    <div className="text-black">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="pl-2 pt-4 text-2xl font-bold flex">
        Overview channel page
      </div>
      <div className="flex flex-nowrap space-x-3 pt-4">
        <div className="w-[400px] h-[32em] bg-white border-[1px] border-gray-300 rounded-md p-[10px]">
          <div className="border-[1px] border-gray-200 border-dashed h-full flex flex-col justify-between">
            <div className="h-1/2 w-full flex justify-center items-end">
              <img
                className="w-36 h-36"
                src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg"
              />
            </div>
            <div className=" h-1/5 text-center text-sm text-gray-500 pt-4">
              Do you want to see metrics for your recent videos?
              <br />
              Upload and publish a video to get started
            </div>
            <div className="h-[30%] text-center text-white">
              <button
                className="px-4 py-2 bg-blue-700 rounded-sm font-[550]"
                onClick={() => dispatch(setIsModalUpload(!isModalUpload))}
              >
                Upload video
              </button>
            </div>
          </div>
        </div>
        <AnalytiscChannel />
      
      </div>

      {isModalUpload ? (
        <div className="z-20 bg-white w-3/6 translate-x-[15%] h-5/6 absolute top-[5%] rounded-md flex-nowrap min-h-[580px]">
          {stepUpload ? (
            <InformationFill
              onClose={() => {
                dispatch(setIsModalUpload(false));
              }}
              handleRefresh={handleRefresh}
            />
          ) : (
            <Upload
              onClose={() => {
                dispatch(setIsModalUpload(false));
              }}
              stepUpload={() => setStepUpload(true)}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OverviewScreen;
