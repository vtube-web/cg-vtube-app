import React, { useEffect, useState } from "react";
import style from "../../assets/scss/main_screen/subscribe/_subscription.module.scss";
import { BsGrid3X2GapFill, BsListUl } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideosSubscribed,
  selectVideoSubscribedList,
} from "../../features/video/videoSlice";
import VideoRender from "../../components/subcribed/VideoRender";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  getInfoUser,
  getListUser,
  selectUserInfo,
  selectUserList,
} from "../../features/auth/userSlice";
import { BiBell } from "react-icons/bi";
import {
  addSubscriber,
  removeSubscribed,
} from "../../features/video/subscriberSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function SubscribedScreen() {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoSubscribedList);
  const user = useSelector(selectUserInfo);
  const channel = useSelector(selectUserList);
  const [listVideoSubscribed, setListVideoSubscribed] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [channelList, setChannelList] = useState([]);
  const [showNoSubscribedMessage, setShowNoSubscribedMessage] = useState(false);
  const [isGridMode, setIsGridMode] = useState(true);
  const [showChannelList, setShowChannelList] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    dispatch(getVideosSubscribed());
    return () => setListVideoSubscribed([]);
  }, []);

  useEffect(() => {
    if (videoListPage && videoListPage.content) {
      setShowNoSubscribedMessage(videoListPage.content.length !== 0);
      setListVideoSubscribed((prevList) => {
        if (Array.isArray(prevList) && prevList) {
          return [...prevList, ...videoListPage.content];
        } else {
          return [...videoListPage.content];
        }
      });
    }
  }, [videoListPage]);

  useEffect(() => {
    dispatch(getInfoUser());
    setUserInfo(user);
    if (user && userInfo) {
      dispatch(getListUser(userInfo.subscriptions));
    }
    setChannelList(channel);
    return () => setUserInfo({});
  }, []);
  const handleSetIsGridMode = (gridMode) => {
    setIsGridMode(gridMode);
    setShowChannelList(false);
  };

  const fetchMoreData = () => {
    setTimeout(async () => {
      if (videoListPage && videoListPage.hasNext) {
        await dispatch(getVideosSubscribed(videoListPage.currentPageNumber + 1))
          .then((response) => {
            const newVideos = response.payload.data.content;
            if (newVideos && newVideos.length > 0) {
              const currentVideos = [...listVideoSubscribed];
              const newVideosReturn = currentVideos.concat(newVideos);
              setListVideoSubscribed(newVideosReturn);
              setShowNoSubscribedMessage(true);
            } else {
              console.log("No new videos received.");
            }
          })
          .catch((error) => {
            console.error("Error fetching more data:", error);
          });
      }
    }, 1500);
  };
  const handleSubscribeClick = (id) => {
    if (isSubscribed) {
      dispatch(removeSubscribed(id));
    } else {
      dispatch(addSubscriber(id));
    }
    setIsSubscribed(!isSubscribed);
    toast.success(
      isSubscribed ? "Subscription removed" : "Subscription added",
      {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return (
    <div className={`${style.main} row`}>
      <div className={style.header}>
        <div className={style.tittle}>
          <p>Latest</p>
        </div>
        <div className={style.header__button}>
          <div className={style.header__button__manage}>
            <button onClick={() => setShowChannelList(true)}>Manage</button>
          </div>
          <div className={style.header__button__menu}>
            <button onClick={() => handleSetIsGridMode(true)}>
              <BsGrid3X2GapFill size={24} />
            </button>
            <button onClick={() => handleSetIsGridMode(false)}>
              <BsListUl size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${style.content}`}>
        {showChannelList ? (
          <>
            {channelList.map((channel) => (
              <div className={`${style.content__channel} container`}>
                <Link to={`/homeProfile/${channel.userName}/*`}>
                  <div className={style.channel__avatar}>
                    <img src={channel.avatar} alt="avatar" />
                  </div>
                </Link>
                <div className={style.info__channel}>
                  <Link to={`/homeProfile/${channel.userName}/*`}>
                    <div className={style.channelName}>
                      <p>
                        {channel.channelName
                          ? channel.channelName
                          : channel.userName}
                      </p>
                    </div>
                    <div className={style.subs__video}>
                      <span>{channel.subscribers} subscribed</span> •{" "}
                      <span>{channel.videoList?.length} videos</span>
                    </div>
                    <div className={style.channel__description}>
                      {channel?.description}
                    </div>
                  </Link>
                  <ToastContainer />
                  <div className={style.btn__subs}>
                    <button
                      className={`${style.btn__unsubscribed} ${
                        !isSubscribed ? style.subscribe : ""
                      }`}
                      onClick={() => handleSubscribeClick(channel.id)}
                    >
                      {isSubscribed ? (
                        <span>
                          <BiBell size={24} /> Subscribed
                        </span>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <InfiniteScroll
            className="row"
            style={{ overflow: "hidden" }}
            dataLength={listVideoSubscribed.length}
            next={fetchMoreData}
            hasMore={videoListPage && videoListPage.hasNext}
            loader={<ProgressSpinner className={style.my__spinner} />}
          >
            {showNoSubscribedMessage ? (
              Array.isArray(listVideoSubscribed) &&
              listVideoSubscribed.length > 0 ? (
                listVideoSubscribed.map((videoData, index) => (
                  <VideoRender
                    key={`${videoData.videoId}_${index}`}
                    isGridMode={isGridMode}
                    {...videoData}
                  />
                ))
              ) : (
                <p>There are no videos according to the subscribed channel</p>
              )
            ) : (
              <p>Subscribe to watch videos by channel</p>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
