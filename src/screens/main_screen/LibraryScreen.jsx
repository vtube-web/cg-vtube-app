import React, { useEffect, useState } from "react";
import style from "../../assets/scss/main_screen/library/_library.module.scss";
import { GoHistory } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoWatched,
  selectVideoWatchedList,
} from "../../features/video/videoWatchedSlice";
import {
  getVideoLiked,
  selectVideoLikedList,
} from "../../features/video/videoLikedSlice";
import VideosRender from "../../components/library/VideosRender";
import { getInfoUser, selectUserInfo } from "../../features/auth/userSlice";

export default function LibraryScreen() {
  const dispatch = useDispatch();
  const videoWatched = useSelector(selectVideoWatchedList);
  const videoLiked = useSelector(selectVideoLikedList);
  const loggerUser = useSelector(selectUserInfo);
  const [userInfo, setUserInfo] = useState({});
  const [listVideoWatched, setListVideoWatched] = useState({});
  const [listVideoLiked, setListVideoLiked] = useState({});
  const [showNoWatchHistoryMessage, setShowNoWatchHistoryMessage] =
    useState(false);
  const [showNoLikedMessage, setShowNoLikedMessage] = useState(false);
  const [reRender, setReRender] = useState(true);

  useEffect(() => {
    if (videoWatched.length === 0 || reRender) {
      dispatch(getVideoWatched());
    }
    if (videoLiked.length === 0 || reRender) {
      dispatch(getVideoLiked());
    }
    if (!loggerUser || reRender) {
      dispatch(getInfoUser());
    }
    setReRender(!reRender);
    setShowNoWatchHistoryMessage(videoWatched.length !== 0);
    setShowNoLikedMessage(videoLiked.length !== 0);
    setListVideoWatched(videoWatched.content);
    setListVideoLiked(videoLiked.content);
    setUserInfo(loggerUser);
  }, [dispatch]);

  return (
    <div className="container row">
      <div className={`${style.primary} col col-10`}>
        <div className={style.list}>
          <div className={style.header}>
            <div className={style.title}>
              <Link to="/watchedVideos">
                <button>
                  <GoHistory size={24} />
                  &nbsp;&nbsp; History
                </button>
              </Link>
            </div>
            <div className={style.menu}>
              <Link to="/watchedVideos">
                <button>See all</button>
              </Link>
            </div>
          </div>
          <div className={`${style.body} row`}>
            {showNoWatchHistoryMessage ? (
              Array.isArray(listVideoWatched) && listVideoWatched.length > 0 ? (
                listVideoWatched.map((videoData, index) => (
                  <VideosRender
                    key={`${videoData.videoId}_${index}`}
                    {...videoData}
                  />
                ))
              ) : (
                <p>No data to display</p>
              )
            ) : (
              <p>No watch history available</p>
            )}
          </div>
        </div>
        <hr />
        <div className={style.list}>
          <div className={style.header}>
            <div className={style.title}>
              <Link to="/likedVideos">
                <button>
                  <BiLike size={24} />
                  &nbsp;&nbsp; Liked videos
                </button>
              </Link>
            </div>
            <div className={style.menu}>
              <Link to="/likedVideos">
                <button>See all</button>
              </Link>
            </div>
          </div>
          <div className={`${style.body} row`}>
            {showNoLikedMessage ? (
              Array.isArray(listVideoLiked) && listVideoLiked.length > 0 ? (
                listVideoLiked.map((videoData) => (
                  <VideosRender key={videoData.videoId} {...videoData} />
                ))
              ) : (
                <p>No data to display</p>
              )
            ) : (
              <p>No watch history available</p>
            )}
          </div>
        </div>
      </div>
      <div className={`${style.secondary} col col-2 d-none d-lg-block`}>
        {userInfo && (
          <>
            <div className={`${style.item} `}>
              <div className={style.info}>
                <img
                  src={userInfo.avatar ? userInfo.avatar : ""}
                  alt="avatar"
                />
                <p>{userInfo.userName}</p>
              </div>
              <hr />
              <div className={style.general}>
                <div className={style.part}>
                  <div>Subscriptions</div>
                  <div className={style.number}>
                    {userInfo.subscriptions ? userInfo.subscriptions.length : 0}
                  </div>
                </div>
                <hr />
                <div className={style.part}>
                  <div>Uploads</div>
                  <div className={style.number}>
                    {userInfo.videoList ? userInfo.videoList.length : 0}
                  </div>
                </div>
                <hr />
                <div className={style.part}>
                  <div>Likes</div>
                  <div className={style.number}>
                    {userInfo.likedVideos ? userInfo.likedVideos.length : 0}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
