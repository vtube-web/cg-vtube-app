import React from "react";
import style from "../../assets/scss/main_screen/liked_video/_likedVideos.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import formatNumberView from "../../format/FormatNumberView";

const RenderShorts = (handleRemoveItem, ...likedShortVideos) => {
  const videos = likedShortVideos;
  if (!likedShortVideos || !Array.isArray(likedShortVideos)) {
    console.log("no data");
    return <p>There are no short videos.</p>;
  }
  return (
    <div className={style.list__shorts}>
      {likedShortVideos?.map((video) => (
        <div
          key={video.id}
          className={`${style.short__render} col-sm-6 col-md-3 col-lg-3`}
        >
          <Link to={`/shorts`}>
            <div className={style.content__img}>
              <img src={video.thumbnail} alt="thumbnail" />
            </div>
          </Link>
          <div className="row">
            <div className="col">
              <Link to={`/shorts/${video.videoId}`}>
                <div className={style.content__tittle}>{video.title}</div>
                <div className={style.content__view}>
                  {formatNumberView(video.views)} views
                </div>
              </Link>
            </div>
            <div className="col-2" style={{ padding: "15px 0 0 0" }}>
              <button>
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderShorts;
