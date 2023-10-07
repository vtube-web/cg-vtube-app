import style from "../../assets/scss/Components/Watching/_watchedVideo.module.scss";
import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMore,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import formatNumberView from "../../format/FormatNumberView";
import { useDispatch } from "react-redux";
import { removeVideoWatched } from "../../features/video/videoWatchedSlice";
import Swal from "sweetalert2";

const WatchedRender = ({ handleRemoveItem, index, ...videoData }) => {
  const dispatch = useDispatch();

  const handleDelete = (videoData) => {
    dispatch(removeVideoWatched(videoData.videoId));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "All views of this video removed from history",
      showConfirmButton: false,
      timer: 2000,
    });
    handleRemoveItem();
  };

  return (
    <div
      className={`${style.item__section__render} row`}
      key={videoData.videoId}
    >
      <div className={style.video__render}>
        <img src={videoData.thumbnail} alt="Video Thumbnail" />
        <div className={style.time__video}>30:56</div>

        <div className={style.icon__hover}>
          <button>
            <AiOutlineClockCircle size={24} />
            <span className={style.label}>Watch Later</span>
          </button>
        </div>
        <div className={style.icon__hover2}>
          <button>
            <MdPlaylistAdd size={24} />
            <span className={style.label}>Add to queue</span>
          </button>
        </div>
      </div>
      <div className={style.text__wrapper}>
        <div className="row">
          <div className="col-9">
            <div>
              <div className={style.text__box}>
                <a href="">{videoData.title}</a>
              </div>
              <div className={`${style.data__video} row`}>
                <div className="col-6">
                  <a href="#" className={style.hover__link}>
                    {videoData.userName}
                  </a>
                  <span className={style.hover__content}>
                    {videoData.userName}
                  </span>
                </div>
                <div className="col-6">
                  {formatNumberView(videoData.views)} views
                </div>
              </div>
            </div>
          </div>
          <div className="col-3" style={{ display: "flex" }}>
            <button
              className={style.icon__button}
              onClick={() => handleDelete(videoData)}
            >
              <AiOutlineClose size={20} />
            </button>
            <button className={style.icon__button}>
              <AiOutlineMore size={20} />
            </button>
          </div>
        </div>
        <div className={style.description__text}>{videoData.description}</div>
      </div>
    </div>
  );
};

export default WatchedRender;
