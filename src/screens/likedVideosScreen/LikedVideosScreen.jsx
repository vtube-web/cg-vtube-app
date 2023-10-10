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
import { BiSolidLike } from "react-icons/bi";

function LikedVideosScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoLikedList);
  const [activeButton, setActiveButton] = useState("All");
  const [showNoLikedMessage, setShowNoLikedMessage] = useState(false);
  const [likedVideoList, setLikedVideoList] = useState({});
  const [isRemove, setIsRemove] = useState(false);
  const [isChange, setIsChange] = useState(true);
  const [likedVideoRender, setLikedVideoRender] = useState({});
  const handleRemoveItem = () => {
    setIsRemove(!isRemove);
  };

  useEffect(() => {
    if (isChange || isRemove) {
      if (videoList.length === 0 || isRemove) {
        dispatch(getVideoLiked());
        if (isRemove) {
          handleRemoveItem();
        }
      }
      setLikedVideoList(videoList.content);
      setShowNoLikedMessage(Object.keys(videoList).length !== 0);
      const filteredVideoList = filterVideos();
      setLikedVideoRender(filteredVideoList);
    }
  }, [isChange, isRemove, videoList, activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filterVideos = () => {
    switch (activeButton) {
      case "Videos":
        return likedVideoList.filter((video) => video.type === "video");
      case "Shorts":
        return likedVideoList.filter((video) => video.type === "short");
      default:
        return likedVideoList;
    }
  };

  return (
    <div className={`${style.main} main-container`}>
      {showNoLikedMessage ? <Playlist passedProp={videoList.content} /> : null}
      <div className={`${style.playlist__content} `}>
        <div className={`${style.list__button__search} `}>
          {showNoLikedMessage ? (
            <>
              <AllButton
                className={style.btn}
                active={activeButton === "All"}
                onClick={handleButtonClick}
              />
              <VideosButton
                className={style.btn}
                active={activeButton === "Videos"}
                onClick={handleButtonClick}
              />
              <ShortsButton
                className={style.btn}
                active={activeButton === "Shorts"}
                onClick={handleButtonClick}
              />
            </>
          ) : null}
        </div>
        {showNoLikedMessage ? (
          <div className={`${style.list__videos} `}>
            {likedVideoRender && likedVideoRender.length > 0 ? (
              likedVideoRender.map((video, index) => (
                <ListLikedVideo
                  key={index}
                  handleRemoveItem={handleRemoveItem}
                  index={index}
                  {...video}
                />
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
