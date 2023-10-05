import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { firebaseStorage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setVideo,addVideo, getVideo } from "../../../features/studio/videoUploadSlice";
import { useDispatch } from "react-redux";

function Upload({ onClose, stepUpload }) {
  const [uploadStatus, setUploadStatus] = useState(false);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadStatus(true);
      const fileName = file.name;
      const videoRef = ref(firebaseStorage, `videos/${fileName + uuidv4()}`);
      
      uploadBytes(videoRef, file).then((snapshort) => {
        getDownloadURL(snapshort.ref).then((url) => {
          const video = {title:file.name,video_url:url};
          dispatch(addVideo(video));
          setUploadStatus(false);
          stepUpload();
        });
      });
    }
  };

  return (
    <div className="h-full">
      <div className="px-6 h-[13%] py-3 border-b-[1px] border-gray-200 flex flex-none justify-between items-center">
        <div className="text-xl font-semibold">Upload video</div>
        <div
          className="text-2xl text-gray-300 hover:cursor-pointer hover:text-gray-500"
          onClick={onClose}
        >
          ✖
        </div>
      </div>
      <div className="flex justify-center h-[87%] ">
        <div className=" flex flex-col text-center w-3/4 py-4">
          <div className=" h-[40%] flex justify-center items-end">
            <input
              type="file"
              id="fileInputOne"
              accept="video/*"
              className="hidden"
              onChange={handleFile}
              multiple={false}
            />
            <label
              className="bg-gray-100 rounded-full p-8 mb-3 hover:cursor-pointer"
              htmlFor="fileInputOne"
            >
              {uploadStatus ? (
                <div
                  className="inline-block h-8 w-8 m-[22px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <MdFileUpload className="w-20 h-20 text-gray-400 hover:cursor-pointer" />
              )}
            </label>
          </div>
          <div className="h-[10%] font-medium">
            Drag and drop video files to upload
          </div>
          <div className="h-[10%] text-sm text-gray-500">
            Your videos will be private until you publish them.
          </div>
          <div className="h-[20%] ">
            <div className=" flex justify-center">
              <div>
                <input
                  type="file"
                  id="fileInput"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFile}
                  multiple={false}
                />
                <label
                  className="bg-blue-600 py-2 px-4 rounded-md text-white font-semibold hover:cursor-pointer uppercase"
                  htmlFor="fileInput"
                >
                  choose File
                </label>
              </div>
            </div>
          </div>
          <div className="h-[10%] text-xs text-gray-500">
            By submitting a video to Vtube, you confirm that you agree to
            Vtube's Terms of Service and Community Guidelines.
          </div>
          <div className="h-[10%] text-xs text-gray-500">
            You need to ensure that you do not violate the copyright or privacy
            rights of others. Find out more
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
