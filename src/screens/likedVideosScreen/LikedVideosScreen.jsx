import React from "react";
import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoLiked,
  selectVideoLikedList,
} from "../../features/video/videoLikedSlice";
import { useEffect, useState } from "react";
import Playlist from "../likedVideosScreen/Playlist";
import ListLikedVideo from "./ListLikedVideo";
import AllButton from "./AllButton";
import VideosButton from "./VideosButton";
import ShortsButton from "./ShortsButton";

function LikedVideosScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoLikedList);
  const [activeButton, setActiveButton] = useState("All");

  useEffect(() => {
    if (videoList.length === 0) {
      dispatch(getVideoLiked());
      console.log("Getting videos...");
    }
  }, [videoList.length, activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const sortedVideoList = [...videoList].sort(
    (a, b) => b.dateLiked - a.dateLiked
  );

  const filterVideos = () => {
    switch (activeButton) {
      case "Videos":
        return sortedVideoList.filter((video) => video.type === "video");
      case "Shorts":
        return sortedVideoList.filter((video) => video.type === "short");
      default:
        return sortedVideoList;
    }
  };

  const filteredVideoList = filterVideos();

  return (
    <div className={`${style.main} main-container`}>
      <Playlist videos={sortedVideoList} />
      <div className={`${style.playlist__content} `}>
        <div className={`${style.list__button__search} `}>
          <AllButton
            active={activeButton === "All"}
            onClick={handleButtonClick}
          />
          <VideosButton
            active={activeButton === "Videos"}
            onClick={handleButtonClick}
          />
          <ShortsButton
            active={activeButton === "Shorts"}
            onClick={handleButtonClick}
          />
        </div>
        <div className={`${style.list__videos} `}>
          {filteredVideoList.map((video, index) => (
            <ListLikedVideo key={index} index={index} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikedVideosScreen;
