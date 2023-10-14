import React, { useEffect, useState } from "react";
import style from "../../assets/scss/main_screen/subscribe/_subscription.module.scss";
import {
  BsGrid3X2GapFill,
  BsListUl,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getVideosSubscribed, selectVideoSubscribedList } from "../../features/video/videoSlice";
import VideoRender from "../../components/subcribed/VideoRender";

export default function SubscribedScreen() {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoSubscribedList);
  const [listVideoSubscribed, setListVideoSubscribed] = useState({});
  const [showNoSubscribedMessage, setShowNoSubscribedMessage] = useState(false);

  useEffect(() => {
    if (videoListPage.length === 0) {
      dispatch(getVideosSubscribed());
    }
    setShowNoSubscribedMessage(videoListPage.length !== 0);
    setListVideoSubscribed(videoListPage.content);
    console.log(videoListPage.content);
  }, [dispatch, videoListPage]);


  return (
    <div className={`${style.main} row`}>
      <div className={style.header}>
        <div className={style.tittle}>
          <p>Latest</p>
        </div>
        <div className={style.header__button}>
          <div className={style.header__button__manage}>
            <button>Manage</button>
          </div>
          <div className={style.header__button__menu}>
            <button>
              <BsGrid3X2GapFill size={24} />
            </button>
            <button>
              <BsListUl size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${style.content} row`}>
        {showNoSubscribedMessage ? (
          Array.isArray(listVideoSubscribed) &&
          listVideoSubscribed.length > 0 ? (
            listVideoSubscribed.map((videoData, index) => (
              <VideoRender
                key={`${videoData.videoId}_${index}`}
                {...videoData}
              />
            ))
          ) : (
            <p>No data to display</p>
          )
        ) : (
          <p>No watch history available</p>
        )}
      </div>
    </div>
  );
}
