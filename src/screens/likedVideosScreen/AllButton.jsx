import React from "react";
import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";


const AllButton = ({ active, onClick }) => {
  return (
    <button
      className={active ? style.activeButton : ""}
      onClick={() => onClick("All")}
    >
      All
    </button>
  );
};

export default AllButton;
