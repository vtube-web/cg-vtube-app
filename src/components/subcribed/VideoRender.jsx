import style from "../../assets/scss/main_screen/subscribe/_subscription.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import formatNumberView from "../../format/FormatNumberView";
import formatDateAgo from "../../format/FormatDateAgo";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";

const VideoRender = ({ index, isGridMode, ...videoData }) => {
  const renderGrid = () => {
    return (
        <div className={`${style.info} col-md-6 col-lg-4`} key={index}>
          <div className={style.img_thumbnail}>
            <Link to={`/watching/${videoData.id}`}>
              <img src={videoData.thumbnail} alt="thumbnail" />
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
  const renderList = () => {
    return (
        <div className={`${style.info2} col-md-11`} key={index}>
          <div className={style.header__info2}>
            <Link to={`/@${videoData.userDto.userName}`}>
              <img src={videoData.userDto.avatar} alt="avatar" />
              <span>{videoData.userDto.userName}</span>
            </Link>
          </div>
          <div className={style.body__info2}>
            <div className={style.video__render}>
              <Link to={`/watching/${videoData.id}`}>
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
              </Link>
            </div>
            <div className={style.text__wrapper}>
              <div className="row">
                <div>
                  <div>
                    <div className={style.text__box}>
                      <Link to={`/watching/${videoData.id}`}>
                        {videoData.title}
                      </Link>
                    </div>
                    <div className={`${style.data__video} row`}>
                      <Link
                          to={`/@${videoData.userDto.userName}`}
                          className={style.hover__link}
                      >
                        {videoData.userDto.userName}
                      </Link>
                      <span className={style.hover__content}>
                      {videoData.userDto.userName}
                    </span>
                      <span>{formatNumberView(videoData.views)} views</span>
                    </div>
                  </div>
                  <div className={style.description__text}>
                    {videoData.description}
                  </div>
                </div>
                <div className={`${style.btn}`}>
                  <button className={style.icon__button}>
                    <AiOutlineMore size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
    );
  };

  return isGridMode ? renderGrid() : renderList();
};

export default VideoRender;