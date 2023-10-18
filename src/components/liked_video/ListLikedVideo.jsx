import React, { useEffect, useState } from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { AiOutlineMore } from "react-icons/ai";
import formatDateAgo from "../../format/FormatDateAgo";
import formatNumberView from "../../format/FormatNumberView";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PiShareFatLight, PiTrashLight } from "react-icons/pi";
import { removeVideoLiked } from "../../features/video/videoLikedSlice";
import Swal from "sweetalert2";
import handleShareClick from "../../services/handleShareClick";

const ListLikedVideo = ({ handleRemoveItem, index, ...video }) => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRemoveClick = (video) => {
    dispatch(removeVideoLiked(video.videoId));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "This video liked have been removed from the list",
      showConfirmButton: false,
      timer: 2000,
    });
    handleRemoveItem();
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest(`.${style.menu__videos}`)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div key={index} className={`${style.video__render} `}>
      <div className={`${style.index__videos} `}>
        <p>{index + 1}</p>
      </div>

      <div className={`${style.content__videos} `}>
        <Link to={`/watching/${video.videoId}`}>
          <div className={`${style.img__videos} `}>
            <img src={video.thumbnail} alt="Video Thumbnail"></img>
            <div className={style.time__video}>30:56</div>
          </div>
        </Link>

        <div className={`${style.info__videos} `}>
          <Link to={`/watching/${video.videoId}`}>{video.title}</Link>
          <div className={`${style.detail__videos} `}>
            <div className={style.detail__item}>
              <Link to={`/@${video.userName}`}>{video.userName}</Link>
            </div>
            <div className={style.detail__item}>
              {formatNumberView(video.views)} views
            </div>
            <div className={style.detail__item}>
              {formatDateAgo(video.createAt)}
            </div>
          </div>
        </div>
        
      </div>
      <div className={`${style.menu__videos}`}>
        <button onClick={toggleDropdown}>
          <AiOutlineMore size={24} style={{ margin: "auto" }} />
        </button>
        <ul
          className={`${style.dropdownMenu}`}
          style={{ display: dropdownVisible ? "block" : "none" }}
        >
          <li>
            <a onClick={() => handleShareClick(video.videoId)}>
              <PiShareFatLight size={20} /> &nbsp; Share
            </a>
          </li>
          <hr />
          <li>
            <a onClick={() => handleRemoveClick(video)}>
              <PiTrashLight size={20} /> &nbsp; Remove from this Liked videos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListLikedVideo;
