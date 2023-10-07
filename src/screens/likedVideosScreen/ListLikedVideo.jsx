import React from "react";
import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";
import { AiOutlineMore } from "react-icons/ai";
import formatDateAgo from "../../format/FormatDateAgo";
import formatNumberView from "../../format/FormatNumberView";
const ListLikedVideo = ({ index, ...video }) => {
  return (
    <div key={index} className={`${style.video__render} `}>
      <div className={`${style.index__videos} `}>
        <p>{index + 1}</p>
      </div>
      <div className={`${style.content__videos} `}>
        <div className={`${style.img__videos} `}>
          <img src={video.thumbnail} alt="Video Thumbnail"></img>
          <div className={style.time__video}>30:56</div>
        </div>
        <div className={`${style.info__videos} `}>
          <a href="">{video.tittle}</a>
          <div className={`${style.detail__videos} `}>
            <div className={style.detail__item}>{video.userName}</div>
            <div className={style.detail__item}>
              {formatNumberView(video.views)} views
            </div>
            <div className={style.detail__item}>
              {formatDateAgo(video.createAt)}
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.menu__videos} `}>
        <button>
          <AiOutlineMore size={24} style={{ margin: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default ListLikedVideo;
