import style from "../../assets/scss/main_screen/watched_video/_watchedVideo.module.scss";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePause } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeAllVideoWatched,
} from "../../features/video/videoWatchedSlice";
import Swal from "sweetalert2";
import SearchComponent from "./SearchComponent";

const ExtensionsSection = ({
  handleRemoveItem,
  onSearch,
  setShowNoWatchHistoryMessage,
  setVideosGroupedByDay,
}) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const performSearch = () => {
    onSearch(searchKeyword);
  };

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
        // setVideosGroupedByDay({});
        // setShowNoWatchHistoryMessage(true);
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
        setSearchKeyword={setSearchKeyword}
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
    </div>
  );
};

export default ExtensionsSection;
