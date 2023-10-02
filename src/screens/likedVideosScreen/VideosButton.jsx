import React from "react";
import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";

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
