import style from "../../assets/scss/main_screen/watched_video/_watchedVideo.module.scss";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePause, AiOutlineSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllVideoWatched,
  selectVideoWatchedList,
} from "../../features/video/videoWatchedSlice";
import Swal from "sweetalert2";
import groupVideosByDay from "./GroupVideosByDay";
import SearchComponent from "./SearchComponent";

const ExtensionsSection = ({handleRemoveItem}) => {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoWatchedList);
  const [videosGroupedByDay, setVideosGroupedByDay] = useState({});
  const [showNoWatchHistoryMessage, setShowNoWatchHistoryMessage] =
    useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const performSearch = () => {
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
    setVideosGroupedByDay(filteredVideosGroupedByDay);
  };

  useEffect(() => {
    if (!videoListPage || !videoListPage.content) {
      console.error("Invalid videos data.");
      setShowNoWatchHistoryMessage(true);
      return;
    }

    const videos = videoListPage.content;
    const groupedVideos = groupVideosByDay(videos);
    const sortedGroupedVideos = Object.keys(groupedVideos)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, key) => {
        acc[key] = groupedVideos[key];
        return acc;
      }, {});
    setShowNoWatchHistoryMessage(false);
    setVideosGroupedByDay(sortedGroupedVideos);
  }, [videoListPage]);

  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your VTube watch history will be cleared from all YouTube apps on all devices!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear watch history",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAllVideoWatched());
        setVideosGroupedByDay({});
        setShowNoWatchHistoryMessage(true);
        handleRemoveItem();
        Swal.fire("Cleared!", "All videos have been cleared.", "success");
      }
    });
  };

  return (
    <div className={`${style.secondary} col-auto`}>
      <SearchComponent
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        performSearch={performSearch}
      />
      <div className={style.button__render}>
        <button onClick={() => handleDeleteAll()}>
          <RiDeleteBin6Line size={22} />
          <span>Clear all watch history</span>
        </button>
      </div>
      <div className={style.button__render}>
        <button>
          <AiOutlinePause size={22} />
          <span>Pause watch history</span>
        </button>
      </div>
      <div className={style.button__render}>
        <button>
          <AiOutlineSetting size={22} />
          <span>Manage all history</span>
        </button>
      </div>
    </div>
  );
};

export default ExtensionsSection;
