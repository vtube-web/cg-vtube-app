import style from "../../assets/scss/main_screen/subscribe/_subscription.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import formatNumberView from "../../format/FormatNumberView";
import formatDateAgo from "../../format/FormatDateAgo";
import { Link } from "react-router-dom";

const VideoRender = ({ index, ...videoData }) => {
  return (
    <div className={`${style.info} col-md-6 col-lg-4`} key={index}>
      <div className={style.img_thumbnail}>
        <Link to={`/watching/${videoData.id}`}>
          <img src={videoData.thumbnail} alt="thumbnail"/>
          <div className={style.time__video}>30:56</div>
        </Link>
      </div>
      <div className={`${style.detail} row`}>
        <div className="col-2">
          <Link to={`/@${videoData.userDto.userName}`}>
            <img src={videoData.userDto.avatar} alt="avatar" />
          </Link>
        </div>
        <div className="col">
          <div className={style.content__tittle}>
            <Link to={`/watching/${videoData.id}`}>{videoData.title}</Link>
          </div>
          <div className={style.content__username}>
            <Link to={`/@${videoData.userDto.userName}`}>
              {videoData.userDto.userName}
            </Link>
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

export default VideoRender;
