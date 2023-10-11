import style from "../../assets/scss/Components/Watching/_watchedVideo.module.scss";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoWatched,
  selectVideoWatchedList,
} from "../../features/video/videoWatchedSlice";
import React, { useEffect, useState } from "react";
import formatDateWatched from "../../format/FormatDateWatched";
import ExtensionsSection from "./ExtensionsSection";
import WatchedRender from "./WatchedRender";
import groupVideosByDay from "./groupVideosByDay";

const WatchedScreen = () => {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoWatchedList);
  const [videosGroupedByDay, setVideosGroupedByDay] = useState({});
  const [showNoWatchHistoryMessage, setShowNoWatchHistoryMessage] =
    useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(null);
  const [isChange, setIsChange] = useState(true);
  const [isRemove, setIsRemove] = useState(false);

  const handleRemoveItem = () => {
    setIsRemove(!isRemove);
  };

  useEffect(() => {
    if (isChange || isRemove) {
      if (!videoListPage || !videoListPage.content || isRemove) {
        dispatch(getVideoWatched());
        if (isRemove) {
          handleRemoveItem();
        };
        return;
      }
      const videos = videoListPage.content;
      const groupedVideos = groupVideosByDay(videos);
      setVideosGroupedByDay(groupedVideos);
      setShowNoWatchHistoryMessage(Object.keys(groupedVideos).length !== 0);
    }
  }, [isChange, isRemove, videoListPage]);

  useEffect(() => {
    if (!searchKeyword) {
      setFilteredVideos(null);
      return;
    }

    const filteredVideosGroupedByDay = Object.keys(videosGroupedByDay).reduce(
      (acc, key) => {
        const filteredVideos = videosGroupedByDay[key].filter((video) =>
          video.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        if (filteredVideos.length > 0) {
          acc[key] = filteredVideos;
        }
        return acc;
      },
      {}
    );
    setFilteredVideos(filteredVideosGroupedByDay);
  }, [searchKeyword, videosGroupedByDay]);

  return (
    <div className={`${style.watched__container} row`}>
      <ExtensionsSection handleRemoveItem={handleRemoveItem} />
      <div className={`${style.primary} col-auto`}>
        <div className={style.section__list__render}>
          {showNoWatchHistoryMessage && (
            <div className={style.header__container}>
              <p>Watch history</p>
            </div>
          )}
          <div className={style.list__contents__render}>
            {!showNoWatchHistoryMessage && (
              <div className={style.noWatchHistoryMessage}>
                <AiOutlineFieldTime size={100} />
                <h3>Keep track of what you watch</h3>
                <p>This list has no videos.</p>
              </div>
            )}
            {filteredVideos
              ? Object.keys(filteredVideos).map((date) => (
                  <div key={date}>
                    <p style={{ marginTop: 30, fontWeight: 550 }}>
                      {formatDateWatched(date)}
                    </p>
                    {filteredVideos[date].map((videoData, index) => (
                      <WatchedRender
                        key={`${videoData.videoId}_${index}`}
                        {...videoData}
                      />
                    ))}
                  </div>
                ))
              : Object.keys(videosGroupedByDay).map((date) => (
                  <div key={date}>
                    <p style={{ marginTop: 30, fontWeight: 550 }}>
                      {formatDateWatched(date)}
                    </p>
                    {videosGroupedByDay[date].map((videoData, index) => (
                      <WatchedRender
                        handleRemoveItem={handleRemoveItem}
                        key={`${videoData.videoId}_${index}`}
                        {...videoData}
                      />
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchedScreen;
