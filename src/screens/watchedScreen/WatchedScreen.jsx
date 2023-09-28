import style from "../../assets/scss/Components/Watching/_watchedVideo.module.scss";
import {
  AiOutlineSearch,
  AiOutlinePause,
  AiOutlineSetting,
  AiOutlineClose,
  AiOutlineMore,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoWatched,
  selectVideoWatchedList,
} from "../../features/video/videoWatchedSlice";
import { useEffect, useState } from "react";

function formatNumber(value) {
  const units = ["", "N", "Tr", "Tr", "Tr", "Tỉ"];
  let i = 0;
  while (value >= 1000 && i < units.length) {
    value /= 1000;
    i++;
  }
  const formattedValue = value % 1 === 0 ? value : value.toFixed(1);
  return `${formattedValue} ${units[i]}`;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Hôm nay";
  } else if (isYesterday(date)) {
    return "Hôm qua";
  }

  const months = [
    "thg 1",
    "thg 2",
    "thg 3",
    "thg 4",
    "thg 5",
    "thg 6",
    "thg 7",
    "thg 8",
    "thg 9",
    "thg 10",
    "thg 11",
    "thg 12",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() - 1 &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export default function WatchedScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoWatchedList);
  const [videosGroupedByDay, setVideosGroupedByDay] = useState({});

  const header = (
    <div className={style.header__video__render}>
      <p>Hôm nay</p>
    </div>
  );

  useEffect(() => {
    if (videoList.length === 0) {
      dispatch(getVideoWatched());
      console.log("Getting list videos watched ...");
    } else {
      const groupedVideos = groupVideosByDay(videoList);
      const sortedGroupedVideos = Object.keys(groupedVideos)
        .sort((a, b) => new Date(b) - new Date(a))
        .reduce((acc, key) => {
          acc[key] = groupedVideos[key];
          return acc;
        }, {});

      setVideosGroupedByDay(sortedGroupedVideos);
    }
  }, [dispatch, videoList]);

  const groupVideosByDay = (videos) => {
    const groupedVideos = {};
    videos.forEach((video) => {
      const date = video.date_watched.split("T")[0];
      if (!groupedVideos[date]) {
        groupedVideos[date] = [];
      }
      groupedVideos[date].push(video);
    });
    return groupedVideos;
  };

  return (
    <div className={style.watched__container}>
      <div className={style.primary}>
        <div className={style.section__list__render}>
          <div className={style.header__container}>
            <p>Nhật ký xem</p>
          </div>
          <div className={style.list__contents__render}>
            {/* Header và video theo từng ngày */}
            {Object.keys(videosGroupedByDay).map((date) => (
              <div key={date}>
                <p style={{ marginTop: 30 }}>{formatDate(date)}</p>
                {videosGroupedByDay[date].map((videoData) => (
                  <div className={`${style.item__section__render} row`}>
                    <div className={style.video__render}>
                      <a href="">
                        <img
                          src={videoData.imgVideo}
                          alt="image"
                          style={{ borderRadius: "10px", height: "100%" }}
                        />
                        <div className={style.time__video}>30:56</div>
                      </a>
                      <div className={style.icon__hover}>
                        <button>
                          <AiOutlineClockCircle size={24} />
                          <span className={style.label}>Xem sau</span>
                        </button>
                      </div>
                      <div className={style.icon__hover2}>
                        <button>
                          <MdPlaylistAdd size={24} />
                          <span className={style.label}>
                            Thêm vào danh sách chờ
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className={style.text__wrapper}>
                      <div className="row">
                        <div className="col-9">
                          <div>
                            <div className={style.text__box}>
                              <a href="">{videoData.tittle}</a>
                            </div>
                            <div className={`${style.data__video} row`}>
                              <div className="col-6">
                                {videoData.nameChannel}
                              </div>
                              <div className="col-6">
                                {formatNumber(videoData.view)} lượt xem
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3" style={{ display: "flex" }}>
                          <button className={style.icon__button}>
                            <AiOutlineClose size={20} />
                          </button>
                          <button className={style.icon__button}>
                            <AiOutlineMore size={20} />
                          </button>
                        </div>
                      </div>
                      <div className={style.description__text}>
                        {videoData.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.secondary}>
        <div className={`${style.input__wrapper} row`}>
          <div
            style={{
              height: 40,
              width: 40,
              padding: 0,
              textAlign: "center",
            }}
          >
            <button style={{ height: 40, width: 40 }}>
              <AiOutlineSearch size={22} />
            </button>
          </div>
          <div className="col-10">
            <input
              type="text"
              placeholder="Tìm kiếm trong danh sách video ..."
            ></input>
          </div>
        </div>
        <div className={style.button__render}>
          <button>
            <RiDeleteBin6Line size={22} />
            <span>Xóa nhật ký xem</span>
          </button>
        </div>
        <div className={style.button__render}>
          <button>
            <AiOutlinePause size={22} />
            <span>Tạm dừng lưu nhật ký xem</span>
          </button>
        </div>
        <div className={style.button__render}>
          <button>
            <AiOutlineSetting size={22} />
            <span>Quản lý toàn bộ lịch sử hoạt động</span>
          </button>
        </div>
      </div>
    </div>
  );
}
