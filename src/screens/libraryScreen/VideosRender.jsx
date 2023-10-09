import { BsThreeDotsVertical } from "react-icons/bs";
import style from "../../assets/scss/Components/Watching/_library.module.scss";
import formatNumberView from "../../format/FormatNumberView";
import { Link } from "react-router-dom";
import formatDateAgo from "../../format/FormatDateAgo";

const VideosRender = ({ ...videoData }) => {
  return (
    <div
      className={`${style.info} col-sm-6 col-md-4 col-lg-3`}
      key={videoData.videoId}
    >
      <Link to={`/watching/${videoData.videoId}`}>
        <img src={videoData.thumbnail} alt="thumbnail" />
      </Link>
      <div className={style.time__video}>30:56</div>
      <div className={`${style.detail} row`}>
        <div className="col-10">
          <div className={style.content__tittle}>
            <Link to={`/watching/${videoData.videoId}`}>{videoData.title}</Link>
          </div>
          <div>
            <Link to={`/@${videoData.userName}`}>{videoData.userName}</Link>
          </div>
          <div>
            {formatNumberView(videoData.views)} views •{" "}
            {formatDateAgo(videoData.createAt)}
          </div>
        </div>
        <div className="col-2">
          <button>
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosRender;