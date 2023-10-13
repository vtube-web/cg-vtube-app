import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { AiOutlineMore } from "react-icons/ai";
import formatDateAgo from "../../format/FormatDateAgo";
import formatNumberView from "../../format/FormatNumberView";
import { Link } from "react-router-dom";

const ListLikedVideo = ({ index, ...video }) => {
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
        <button>
          <AiOutlineMore size={24} style={{ margin: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default ListLikedVideo;
