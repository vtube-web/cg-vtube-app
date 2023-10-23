import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import {
  AiOutlineDownload,
  AiOutlineMore,
  AiFillCaretRight,
} from "react-icons/ai";
import { IoShuffleSharp } from "react-icons/io5";
import formatDate from "../../format/FormatDate";

const Playlist = (props) => {
  const { likedVideoList, totalElements } = props;
  const totalVideos = totalElements;
  const firstVideo = likedVideoList[0];
  return (
    <div className={`${style.playlist__liked} `}>
      <div className={`${style.content} `}>
        <a href="src/screens/likedVideosScreen">
          <div className={`${style.content__header} `}>
            <div className={`${style.content__thumbnail} `}>
              <div className={`${style.content__thumbnail__img} `}>
                <img
                  src={firstVideo ? firstVideo.thumbnail : ""}
                  alt="thumbnail"
                />
              </div>
            </div>
          </div>
        </a>

        <div className={`${style.content__body} `}>
          <div className={`${style.content__text__header} `}>
            <p>Liked videos</p>
          </div>
          <div className={`${style.content__text__body} `}>
            <div className={`${style.content__text__username} `}>
              <p>{firstVideo?.userLike}</p>
            </div>
            <div className={`${style.content__text__data} `}>
              <p>{totalVideos} videos</p>
              <p>
                Last updated on{" "}
                {firstVideo && firstVideo.likedAt
                  ? formatDate(firstVideo.likedAt.split("T")[0])
                  : "Unknown"}
              </p>
            </div>
            <div className={`${style.content__button} `}>
              <button>
                <AiOutlineDownload size={24} style={{ margin: "auto" }} />
              </button>
              <button>
                <AiOutlineMore size={24} style={{ margin: "auto" }} />
              </button>
            </div>
          </div>
          <div className={`${style.playlist__button} `}>
            <button style={{ color: "black", background: "white" }}>
              <div className={`${style.playlist__button__icon} `}>
                <AiFillCaretRight size={30} />
              </div>
              <span>Play all</span>
            </button>
            <button style={{ color: "white" }}>
              <div className={`${style.playlist__button__icon} `}>
                <IoShuffleSharp size={30} />
              </div>
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
