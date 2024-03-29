import style from "../../assets/scss/main_screen/watched_video/_watchedVideo.module.scss";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoWatched,
  selectVideoWatchedList,
} from "../../features/video/videoWatchedSlice";
import React, { useEffect, useState } from "react";
import formatDateWatched from "../../format/FormatDateWatched";
import ExtensionsSection from "../../components/watched/ExtensionsSection";
import WatchedRender from "../../components/watched/WatchedRender";
import groupVideosByDay from "../../components/watched/GroupVideosByDay";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressSpinner } from "primereact/progressspinner";

const WatchedScreen = () => {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoWatchedList);
  const [videosGroupedByDay, setVideosGroupedByDay] = useState([]);
  const [showNoWatchHistoryMessage, setShowNoWatchHistoryMessage] =
      useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
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
        }
        return;
      }
      const videos = videoListPage.content;
      const groupedVideos = groupVideosByDay(videos);
      setVideosGroupedByDay((prev) => ({ ...prev, ...groupedVideos }));
      setShowNoWatchHistoryMessage(Object.keys(groupedVideos).length !== 0);
      setIsRemove(false);
    }
  }, [isChange, isRemove, videoListPage]);

  useEffect(() => {
    if (!searchKeyword) {
      setFilteredVideos(null);
      return;
    }

    const removeDiacritics = (text) => {
      return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D");
    };

    const searchVideos = (videos, searchKeyword) => {
      const normalizedSearchTerm =
          removeDiacritics(searchKeyword).toLowerCase();

      return videos.filter((video) => {
        const videoTitle = removeDiacritics(video.title).toLowerCase();
        const userName = removeDiacritics(video.userName).toLowerCase();
        const channelName = video.channelName
            ? removeDiacritics(video.channelName).toLowerCase()
            : "";

        return (
            videoTitle.includes(normalizedSearchTerm) ||
            userName.includes(normalizedSearchTerm) ||
            channelName.includes(normalizedSearchTerm)
        );
      });
    };

    const filteredVideosGroupedByDay = Object.keys(videosGroupedByDay).reduce(
        (acc, key) => {
          const filteredVideos = searchVideos(
              videosGroupedByDay[key],
              searchKeyword
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

  const handleSearch = (result) => {
    setSearchKeyword(result);
  };

  const fetchMoreData = () => {
    setTimeout(async () => {
      if (videoListPage && videoListPage.hasNext) {
        await dispatch(getVideoWatched(videoListPage.currentPageNumber + 1))
            .then((response) => {
              const newVideos = response.payload.data.content;
              if (newVideos && newVideos.length > 0) {
                const currentVideos = { ...videoListPage.content };
                const currentVideosArray = Object.values(currentVideos);
                const newVideosReturn = currentVideosArray.concat(newVideos);
                setVideosGroupedByDay(groupVideosByDay(newVideosReturn));
                setShowNoWatchHistoryMessage(true);
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

  return (
      <div className={`${style.watched__container} row`}>
        <ExtensionsSection
            handleRemoveItem={handleRemoveItem}
            onSearch={handleSearch}
            setShowNoWatchHistoryMessage={setShowNoWatchHistoryMessage}
            setVideosGroupedByDay={setVideosGroupedByDay}
        />
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
              <InfiniteScroll
                  style={{ overflow: "hidden" }}
                  dataLength={videosGroupedByDay && videosGroupedByDay.length}
                  next={fetchMoreData}
                  hasMore={videoListPage && videoListPage.hasNext}
                  loader={<ProgressSpinner className={style.my__spinner} />}
              >
                {filteredVideos
                    ? Object.keys(filteredVideos).map((date) => (
                        <div key={date}>
                          <p style={{ marginTop: 30, fontWeight: 550 }}>
                            {formatDateWatched(date)}
                          </p>
                          {filteredVideos[date].map((videoData, index) => (
                              <WatchedRender
                                  handleRemoveItem={handleRemoveItem}
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
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
  );
};

export default WatchedScreen;