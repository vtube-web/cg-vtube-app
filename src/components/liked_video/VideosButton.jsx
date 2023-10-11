import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";

const VideosButton = ({ active, onClick }) => {
  return (
    <button
      className={active ? style.activeButton : ""}
      onClick={() => onClick("Videos")}
    >
      Videos
    </button>
  );
};

export default VideosButton;
