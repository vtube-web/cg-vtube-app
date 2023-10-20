import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoLiked,
  selectVideoLikedList,
} from "../../features/video/videoLikedSlice";
import { useEffect, useState } from "react";
import Playlist from "../../components/liked_video/Playlist";
import AllButton from "../../components/liked_video/AllButton";
import VideosButton from "../../components/liked_video/VideosButton";
import ShortsButton from "../../components/liked_video/ShortsButton";
import { BiSolidLike } from "react-icons/bi";
import RenderShorts from "../../components/liked_video/RenderShorts";
import RenderVideos from "../../components/liked_video/RenderVideos";

function LikedVideosScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoLikedList);
  const [activeButton, setActiveButton] = useState("All");
  const [showNoLikedMessage, setShowNoLikedMessage] = useState(false);
  const [likedVideoList, setLikedVideoList] = useState({});
  const [isRemove, setIsRemove] = useState(false);
  const [isChange, setIsChange] = useState(true);
  // const [likedVideoRender, setLikedVideoRender] = useState({});
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
      // setLikedVideoRender(filteredVideoList);
    }
  }, [isChange, isRemove, videoList]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filterVideos = () => {
    switch (activeButton) {
      case "Videos":
        return likedVideoList && likedVideoList.length > 0 ? (
          RenderVideos(handleRemoveItem, ...likedVideoList)
        ) : (
          <p>You haven't liked any videos yet, please watch and like it</p>
        );
      case "Shorts":
        return likedVideoList && likedVideoList.length > 0 ? (
          RenderShorts()
        ) : (
          <p>You haven't liked any short videos yet, please watch and like it</p>
        );
      default:
        return likedVideoList && likedVideoList.length > 0 ? (
          RenderVideos(handleRemoveItem, ...likedVideoList)
        ) : (
          <p>You haven't liked any videos yet, please watch and like it</p>
        );
    }
  };

  return (
    <div className={`${style.main} main-container`}>
      {showNoLikedMessage &&
        videoList.content &&
        videoList.content.length > 0 && (
          <Playlist passedProp={videoList.content} />
        )}
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
          filterVideos()
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
