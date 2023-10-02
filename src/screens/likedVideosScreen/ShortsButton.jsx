import React from "react";
import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";

const ShortsButton = ({ active, onClick }) => {
  return (
    <button
      className={active ? style.activeButton : ""}
      onClick={() => onClick("Shorts")}
    >
      Shorts
    </button>
  );
};

export default ShortsButton;
