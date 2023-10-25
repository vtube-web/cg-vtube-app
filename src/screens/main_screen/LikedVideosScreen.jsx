import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoLiked,
  selectVideoLikedList,
  setVideos,
} from "../../features/video/videoLikedSlice";
import { useEffect, useState } from "react";
import Playlist from "../../components/liked_video/Playlist";
import AllButton from "../../components/liked_video/AllButton";
import VideosButton from "../../components/liked_video/VideosButton";
import ShortsButton from "../../components/liked_video/ShortsButton";
import { BiSolidLike } from "react-icons/bi";
import RenderShorts from "../../components/liked_video/RenderShorts";
import RenderVideos from "../../components/liked_video/RenderVideos";
import { ProgressSpinner } from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroll-component";

function LikedVideosScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoLikedList);
  const [activeButton, setActiveButton] = useState("All");
  const [showNoLikedMessage, setShowNoLikedMessage] = useState(false);
  const [likedVideoList, setLikedVideoList] = useState([]);
  const [likedRegularVideos, setLikedRegularVideos] = useState([]);
  const [likedShortVideos, setLikedShortVideos] = useState([]);
  const [isRemove, setIsRemove] = useState(false);
  const [isChange, setIsChange] = useState(true);
  const handleRemoveItem = () => {
    setIsRemove(!isRemove);
  };

  useEffect(() => {
    if (isChange || isRemove) {
      if (videoList.length === 0 || isRemove || likedVideoList?.length === 0) {
        dispatch(getVideoLiked());
        if (isRemove) {
          handleRemoveItem();
        }
      }
      setLikedVideoList(videoList.content);
      setShowNoLikedMessage(Object.keys(videoList).length !== 0);
    }
    return () => setLikedVideoList([]);
  }, [isChange, isRemove, videoList]);

  useEffect(() => {
    if (likedVideoList && likedVideoList.length > 0) {
      const shortVideos = likedVideoList?.filter((video) => video.isShorts);
      const regularVideos = likedVideoList?.filter((video) => !video.isShorts);
      setLikedRegularVideos(regularVideos);
      setLikedShortVideos(shortVideos);
    }
  }, [likedVideoList]);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const fetchMoreData = () => {
    setTimeout(async () => {
      if (videoList && videoList.hasNext) {
        await dispatch(getVideoLiked(videoList.currentPageNumber + 1))
          .then((response) => {
            const newVideos = response.payload.data.content;
            if (newVideos && newVideos.length > 0) {
              const currentVideos = { ...videoList.content };
              const currentVideosArray = Object.values(currentVideos);
              const newVideosReturn = currentVideosArray.concat(newVideos);
              setLikedVideoList(newVideosReturn);
              setShowNoLikedMessage(true);
            } else {
              console.log("No new videos received.");
            }
          })
          .catch((error) => {
            console.error("Error fetching more data:", error);
          });
      }
    }, 1500);
  };

  const filterVideos = () => {
    switch (activeButton) {
      case "Videos":
        return likedRegularVideos ? (
          RenderVideos(handleRemoveItem, ...likedRegularVideos)
        ) : (
          <p className={style.message}>
            You haven't liked any videos yet, please watch and like it
          </p>
        );
      case "Shorts":
        return likedShortVideos ? (
          RenderShorts(handleRemoveItem, ...likedShortVideos)
        ) : (
          <p className={style.message}>
            You haven't liked any short videos yet, please watch and like it
          </p>
        );
      default:
        return likedVideoList ? (
          RenderVideos(handleRemoveItem, ...likedVideoList)
        ) : (
          <p className={style.message}>
            You haven't liked any videos yet, please watch and like it
          </p>
        );
    }
  };

  return (
    <div className={`${style.main} main-container`}>
      {showNoLikedMessage &&
        videoList.content &&
        videoList.content.length > 0 && (
          <Playlist
            likedVideoList={likedVideoList}
            totalElements={videoList.totalElements}
          />
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
        <InfiniteScroll
          className="row"
          style={{ overflow: "hidden" }}
          dataLength={likedVideoList ? likedVideoList.length : 0}
          next={fetchMoreData}
          hasMore={videoList && videoList.hasNext}
          loader={<ProgressSpinner className={style.my__spinner} />}
        >
          {showNoLikedMessage ? (
            filterVideos()
          ) : (
            <div className={style.noLikedMessage}>
              <BiSolidLike size={100} />
              <h3>There are no videos in this playlist yet</h3>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default LikedVideosScreen;
