import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { FcCancel } from "react-icons/fc";
import { MdFileUpload } from "react-icons/md";
import {
  setVideo,
  getVideo,
  editVideo,
  getVideoSuccess,
} from "../../../features/studio/videoUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import VideoUpload from "./VideoUpload";
import TitleSection from "./imformation-fill/TitleSection";
import DescribeSection from "./imformation-fill/DescribeSection";
import DisplayModeSection from "./imformation-fill/DisplayModeSection";
import ImageSection from "./imformation-fill/ImageSection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function InformationFill({ onClose, handleRefresh }) {
  const data = useSelector(getVideo);
  const getDataSuccess = useSelector(getVideoSuccess);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isValidateTitle, setIsValidateTitle] = useState(false);
  const [isTitleLengthMax, setIsTitleLengthMax] = useState(false);
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [describe, setDescribe] = useState("");
  const [isValidateDescribe, setIsValidateDescribe] = useState(false);
  const [isDescribeLengthMax, setIsDescribeLengthMax] = useState(false);
  const [isDescribeFocus, setIsDescribeFocus] = useState(false);

  const [selectedOption, setSelectedOption] = useState("save");
  const [selectedOptionSaveChill, setSelectedOptionSaveChill] =
    useState("private");

  const handleTimeNow = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [time, setTime] = useState(handleTimeNow);
  const [hashtags, setHashtags] = useState([]);

  const [image, setImage] = useState("");
  const [mouseImg, setMouseImg] = useState(false);
  const [isValidateImage, setIsValidateImage] = useState(false);

  const handleChange = (e, type) => {
    const value = e.target.value;
    const length = value.length;

    if (type === "title") {
      setTitle(value);
      setIsValidateTitle(length !== 0 && length < 100);
      setIsTitleLengthMax(length >= 100);
    } else if (type === "describe") {
      setDescribe(value);
      setIsValidateDescribe(length < 5000);
      setIsDescribeLengthMax(length >= 5000);
      setHashtags(describe.match(/#[^\s#]+/g));
    }

    autoExpand(e.target);
  };

  const autoExpand = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };
  useEffect(() => {
    checkTitle();
    checkDescribe();
  }, [title, describe, data, getDataSuccess]);

  const checkTitle = () => {
    if (JSON.stringify(data) !== "{}") {
      setTitle(data.title);
    }
    const length = title?.length || 0;

    setIsValidateTitle(length !== 0 && length < 100);
    setIsTitleLengthMax(length >= 100);
  };

  const checkDescribe = () => {
    const length = describe.length;

    setIsValidateDescribe(length < 5000);
    setIsDescribeLengthMax(length >= 5000);
  };
  const handleImage = (e) => {
    const img = e.target.files[0];
    const imageRef = ref(firebaseStorage, `images/${img.name + uuidv4()}`);
    uploadBytes(imageRef, img).then((snapshort) => {
      getDownloadURL(snapshort.ref).then((url) => {
        setIsValidateImage(true);
        setImage(url);
      });
    });
  };
  const handleChangeImg = () => {
    setImage(null);
  };
  const handleMouseOver = () => {
    setMouseImg(true);
  };
  const handleMouseOut = () => {
    setMouseImg(false);
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleOptionChillChange = (e) => {
    setSelectedOptionSaveChill(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleDescibeNonHashTag = () => {
    return describe.replace(/#\w+/g, "");
  };

  const handleCheckDateTimeRelease = () => {
    const now = new Date();
    const dateInput = new Date(`${date}T${time}`);
    const dateNow = new Date(
      `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
    );
    if (dateInput < dateNow) {
      toast.error(
        "The premiere date and time cannot be less than the current date and time"
      );
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = () => {
    if (
      isValidateTitle &&
      isValidateDescribe &&
      image != "" &&
      isValidateImage
    ) {
      const describeTemp = handleDescibeNonHashTag();
      let release_date = new Date().toISOString();
      let is_private = true;
      if (selectedOption == "save") {
        if (selectedOptionSaveChill == "public") {
          is_private = false;
        }
        const video = {
          id: data.id,
          title: title,
          description: describeTemp,
          thumbnail: image,
          release_date: release_date,
          is_private: is_private,
          hashtags: hashtags,
        };
        dispatch(editVideo(video));
        dispatch(setVideo({}));
        toast.success("success");
        handleRefresh();
      } else {
        if (handleCheckDateTimeRelease()) {
          release_date = new Date(`${date}T${time}`).toISOString();
          const video = {
            id: data.id,
            title: title,
            description: describeTemp,
            thumbnail: image,
            release_date: release_date,
            is_private: is_private,
            hashtags: hashtags,
          };
          dispatch(editVideo(video));
          toast.success("success");
          dispatch(setVideo({}));
          handleRefresh();
        }
      }
    } else {
      toast.error("Please fill in all information and upload images.");
    }
  };

  return (
    <>
      <div className="h-full pb-[55px]">
        <div className="px-6 h-[13%] py-3 border-b-[1px] border-gray-200 flex flex-none justify-between items-center ">
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
        <div className="flex justify-center h-[87%] truncate overflow-y-auto">
          <div className=" flex flex-col w-[90%] py-4 ">
            <div className="text-xl font-bold mb-2 text-gray-700">Detail</div>
            <div className="flex justify-between w-full">
              <div className="w-[60%]">
                <TitleSection
                  isValidateTitle={isValidateTitle}
                  isTitleFocus={isTitleFocus}
                  handleChange={handleChange}
                  setIsTitleFocus={setIsTitleFocus}
                  isTitleLengthMax={isTitleLengthMax}
                  title={title}
                />
                <DescribeSection
                  isValidateDescribe={isValidateDescribe}
                  isDescribeFocus={isDescribeFocus}
                  handleChange={handleChange}
                  setIsDescribeFocus={setIsDescribeFocus}
                  isDescribeLengthMax={isDescribeLengthMax}
                  describe={describe}
                />
              </div>

              <VideoUpload data={data} />
            </div>
            <div className="flex">
              <DisplayModeSection
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                selectedOptionSaveChill={selectedOptionSaveChill}
                handleOptionChillChange={handleOptionChillChange}
                date={date}
                handleDate={handleDate}
                time={time}
                handleTime={handleTime}
              />
              {/* <div className="mt-4 pb-3 w-[40%] px-2">
                <div className="font-semibold text-gray-700">Small picture</div>
                <div className="whitespace-pre-line text-sm text-gray-500 mt-1 mb-3">
                  Choose or upload an image to represent what's in your video.
                  Attractive thumbnails will highlight your video and attract
                  viewers.
                </div>
                <div className="flex">
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/png, image/gif, image/jpeg"
                    className="hidden"
                    onChange={handleImage}
                    multiple={false}
                  />
  
                  {image == null || image == "" ? (
                    <label htmlFor="imageInput">
                      <div className="border-[1px] border-dashed border-gray-200 p-3 text-gray-500 hover:cursor-pointer hover:border-gray-500">
                        <div className="flex justify-center">
                          <LuImagePlus className="w-6 h-6" />
                        </div>
                        <div className="text-sm mt-2 ">Upload thumbnails</div>
                      </div>
                    </label>
                  ) : (
                    <div
                      className="shadow-sm border-[1px] border-black rounded-sm hover:cursor-pointer relative"
                      onMouseOver={() => setMouseImg(true)}
                      onMouseOut={() => setMouseImg(false)}
                    >
                      <img
                        src="https://www.ldg.com.vn/media/uploads/uploads/21204723-hinh-anh-gai-xinh-2.jpg"
                        className=" object-cover w-64 h-40 rounded-sm shadow-sm"
                      />
                      <div
                        className={`absolute bg-black w-64 h-40 top-0 bg-opacity-50 z-50  flex flex-col space-y-3 justify-center hover:cursor-default ${
                          mouseImg ? "block" : "hidden"
                        }`}
                      >
                        <label
                          htmlFor="imageInput"
                          className="text-white flex items-center justify-center mx-5 py-2 rounded-lg space-x-3 z-50 hover:bg-gray-100 hover:bg-opacity-30 hover:cursor-pointer"
                        >
                          <LuImagePlus className="w-6 h-6  " />
                          <div className="text-sm mt-2 ">Change</div>
                        </label>
                        <div
                          onClick={() => setImage(null)}
                          className="text-white flex items-center justify-center mx-5 py-2 rounded-lg space-x-3 z-50 hover:bg-gray-100 hover:bg-opacity-30 hover:cursor-pointer"
                        >
                          <FcCancel className="w-6 h-6" />
                          <div className="text-sm mt-2 ">Cancel</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
              <ImageSection
                image={image}
                handleImage={handleImage}
                handleChangeImg={handleChangeImg}
                isValidateImage={isValidateImage}
                mouseImg={mouseImg}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </div>
          </div>

          {/* video */}
        </div>
      </div>
      <div className="flex justify-between items-center fixed bottom-0 right-0  w-full border-t-[1px] py-2 bg-white">
        <div className="ml-7 text-sm text-gray-500">Moderated by vtube...</div>
        <span
          onClick={handleSubmit}
          className="bg-blue-600 mr-7 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-700 rounded-sm"
        >
          save
        </span>
      </div>
    </>
  );
}

export default InformationFill;
