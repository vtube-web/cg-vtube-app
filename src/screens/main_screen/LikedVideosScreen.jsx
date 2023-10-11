import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoLiked,
  selectVideoLikedList,
} from "../../features/video/videoLikedSlice";
import { useEffect, useState } from "react";
import Playlist from "../../components/liked_video/Playlist";
import ListLikedVideo from "../../components/liked_video/ListLikedVideo";
import AllButton from "../../components/liked_video/AllButton";
import VideosButton from "../../components/liked_video/VideosButton";
import ShortsButton from "../../components/liked_video/ShortsButton";
import { BiSolidLike } from "react-icons/bi";

function LikedVideosScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoLikedList);
  const [activeButton, setActiveButton] = useState("All");
  const [showNoLikedMessage, setShowNoLikedMessage] = useState(false);
  const [likedVideoList, setLikedVideoList] = useState({});

  useEffect(() => {
    if (videoList.length === 0) {
      dispatch(getVideoLiked());
      console.log("Getting videos...");

    }
    console.log(videoList);
    setLikedVideoList(videoList.content);
    setShowNoLikedMessage(Object.keys(videoList).length !== 0);
  }, [videoList.length, activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filterVideos = () => {
    switch (activeButton) {
      case "Videos":
        return likedVideoList.filter((video) => video.type === "video");
      case "shorts":
        return likedVideoList.filter((video) => video.type === "short");
      default:
        return likedVideoList;
    }
  };

  const filteredVideoList = filterVideos();

  return (
    <div className={`${style.main} main-container`}>
      {showNoLikedMessage ? <Playlist passedProp={videoList.content} /> : null}
      <div className={`${style.playlist__content} `}>
        <div className={`${style.list__button__search} `}>
          {showNoLikedMessage ? (
            <>
              <AllButton
                active={activeButton === "All"}
                onClick={handleButtonClick}
              />
              <VideosButton
                active={activeButton === "Videos"}
                onClick={handleButtonClick}
              />
              <ShortsButton
                active={activeButton === "shorts"}
                onClick={handleButtonClick}
              />
            </>
          ) : null}
        </div>
        {showNoLikedMessage ? (
          <div className={`${style.list__videos} `}>
            {filteredVideoList && filteredVideoList.length > 0 ? (
              filteredVideoList.map((video, index) => (
                <ListLikedVideo key={index} index={index} {...video} />
              ))
            ) : (
              <div className={style.noLikedMessage}>
                <p>No videos found.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={style.noLikedMessage}>
            <BiSolidLike size={100} />
            <h3>There are no videos in this playlist yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedVideosScreen;
