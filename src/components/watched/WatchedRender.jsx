import style from "../../assets/scss/main_screen/watched_video/_watchedVideo.module.scss";
import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { PiShareFatLight } from "react-icons/pi";
import handleShareClick from "../../services/handleShareClick";
import formatDuration from "../../format/FomatTimeVideo";

const WatchedRender = ({ handleRemoveItem, index, ...videoData }) => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
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

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest(`.${style.btn}`)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className={`${style.item__section__render} row`} key={index}>
      <div className={style.video__render}>
        <Link to={`/watching/${videoData.videoId}`}>
          <img src={videoData.thumbnail} alt="Video Thumbnail" />
          <div className={style.time__video}>
            {formatDuration(videoData?.duration)}
            {/* 34
            {console.log(videoData.watchedAt)} */}
          </div>

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
        </Link>
      </div>
      <div className={style.text__wrapper}>
        <div className="row">
          <div className="col-9">
            <div>
              <div className={style.text__box}>
                <Link to={`/watching/${videoData.videoId}`}>
                  {videoData.title}
                </Link>
              </div>
              <div className={`${style.data__video} row`}>
                <div className="col-6">
                  <Link
                    to={`/homeProfile/@${videoData.userName}/*`}
                    className={style.hover__link}
                  >
                    {videoData.channelName
                      ? videoData.channelName
                      : videoData.userName}
                  </Link>
                  <span className={style.hover__content}>
                    {videoData.channelName
                      ? videoData.channelName
                      : videoData.userName}
                  </span>
                </div>
                <div className="col-6">
                  {formatNumberView(videoData.views)} views
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.btn} col-3`}>
            <button
              className={style.icon__button}
              onClick={() => handleDelete(videoData)}
            >
              <AiOutlineClose size={20} />
            </button>
            <>
              <button className={style.icon__button} onClick={toggleDropdown}>
                <AiOutlineMore size={20} />
              </button>
              <ul
                className={`${style.dropdownMenu}`}
                style={{ display: dropdownVisible ? "block" : "none" }}
              >
                <li>
                  <a onClick={() => handleShareClick(videoData.videoId)}>
                    <PiShareFatLight size={20} /> &nbsp; Share
                  </a>
                </li>
              </ul>
            </>
          </div>
        </div>
        <div className={style.description__text}>{videoData.description}</div>
      </div>
    </div>
  );
};

export default WatchedRender;
