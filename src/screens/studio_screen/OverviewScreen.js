import React, { useEffect, useState } from "react";
import {
  setIsModalUpload,
  getIsModalUpload,
} from "../../features/studio/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../components/studio/overview/Upload";
import InformationFill from "../../components/studio/overview/InformationFill";
import "../../assets/css/studio/overviewScreen.css";
 import { ToastContainer} from "react-toastify";
import { setVideo } from "../../features/studio/videoUploadSlice";


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
        autoClose={5000}
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
        <div className="w-[400px] h-[29em] bg-white border-[1px] border-gray-300 rounded-md p-6">
          <div className="pb-6 border-b-[1px]">
            <div className="text-xl font-bold">Số liệu phân tích về kênh</div>
            <div className="pt-2 text-sm text-gray-700">
              Số người đăng ký hiện tại
            </div>
            <div className="text-4xl pb-4">0</div>
          </div>
          <div className="pb-6 border-b-[1px]">
            <div className="text-md pt-3 font-bold">Tóm tắt</div>
            <div className=" text-xs text-gray-700">28 ngày qua</div>
            <div className="flex justify-between pt-2 items-center text-md">
              <div className="col-8">Số lượt xem</div>
              <div className="col-3 text-end">1</div>
              <div className="col-1 text-center text-xs">—</div>
            </div>
            <div className="flex justify-between pt-2 items-center text-md">
              <div className="col-8">Số lượt xem</div>
              <div className="col-3 text-end">1</div>
              <div className="col-1 text-center text-xs">—</div>
            </div>
          </div>
          <div className="">
            <div className="text-md pt-3 font-bold">Video hàng đầu</div>
            <div className=" text-xs text-gray-700">
              48 giờ qua · Số lượt xem
            </div>
            <div className="h-8"></div>
            <span className="text-md font-bold p-2 text-blue-700 hover:cursor-pointer  rounded-sm active:bg-blue-100 active:transition-all active:ease-in active:duration-500 active:animate-spin select-none  active:select-all">
              Go to analytics
            </span>
          </div>
        </div>
        {/* <div className="col-3 h-96 bg-white ">b</div> */}
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
