import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import ListLikedVideo from "./ListLikedVideo";

const RenderVideos = (handleRemoveItem, ...likedVideoList) => {
  const videos = likedVideoList;
  if (videos.length === 0) {
    return (
      <div className={style.noLikedMessage}>
        <p>No videos found.</p>
      </div>
    );
  } else {
    return (
      <div className={style.list__videos}>
        {videos.map((video, index) => (
          <ListLikedVideo
            key={index}
            handleRemoveItem={handleRemoveItem}
            index={index}
            {...video}
          />
        ))}
      </div>
    );
  }
};

export default RenderVideos;
