import React, { useEffect, useState } from "react";
import {
  getVideo,
  editVideo,
  getVideoSuccess,
} from "../../../../features/studio/videoUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import VideoUpload from "./VideoUpload";
import TitleSection from "./imformation_fill/TitleSection";
import DescribeSection from "./imformation_fill/DescribeSection";
import DisplayModeSection from "./imformation_fill/DisplayModeSection";
import ImageSection from "./imformation_fill/ImageSection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoShort from "./imformation_fill/VideoShort";
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
  const [startTitle, setStartTitle] = useState(false);

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

  const [isShorts, setIsShorts] = useState(false);

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
  }, [title, describe, data, getDataSuccess, image]);

  const checkTitle = () => {
    if (JSON.stringify(data) !== "{}" && title == "" && startTitle == false) {
      setTitle(data.title);
      setStartTitle(true);
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

  const handleClickVideoButton = () => {
    setIsShorts(false);
  };
  const handleClickShortsButton = () => {
    let duraction = parseInt(data?.duration.split(".")[0]);

    if (duraction > 180) {
      toast.warning("The length of the video exceeds 3 minutes");
    } else {
      setIsShorts(true);
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
          is_shorts: isShorts,
        };
        dispatch(editVideo(video));
        toast.success("success");
        handleRefresh();
        setStartTitle(false);
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
            is_shorts: isShorts,
          };
          dispatch(editVideo(video));
          toast.success("success");
          handleRefresh();
          setStartTitle(false);
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
            {data?.title}
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
        </div>
      </div>
      <div className="flex justify-between items-center fixed bottom-0 right-0  w-full border-t-[1px] py-2 bg-white">
        <VideoShort
          isShorts={isShorts}
          handleClickShortsButton={handleClickShortsButton}
          handleClickVideoButton={handleClickVideoButton}
        />
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
