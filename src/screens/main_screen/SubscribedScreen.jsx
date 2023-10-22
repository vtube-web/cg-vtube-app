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

export default function SubscribedScreen() {
  const dispatch = useDispatch();
  const videoListPage = useSelector(selectVideoSubscribedList);
  const [listVideoSubscribed, setListVideoSubscribed] = useState([]);
  const [showNoSubscribedMessage, setShowNoSubscribedMessage] = useState(false);
  const [render, setRender] = useState(true);
  const [isGridMode, setIsGridMode] = useState(true);

  useEffect(() => {
    if (videoListPage.length === 0 || render) {
      dispatch(getVideosSubscribed());
    }
    setRender(!render);
    if (videoListPage.content && Array.isArray(videoListPage.content)) {
      setShowNoSubscribedMessage(videoListPage.content.length !== 0);
      setListVideoSubscribed((prevList) => {
        if (Array.isArray(prevList)) {
          return [...prevList, ...videoListPage.content];
        } else {
          return [...videoListPage.content];
        }
      });
    }
  }, []);

  const fetchMoreData = () => {
    setTimeout(async () => {
      if (videoListPage && videoListPage.hasNext) {
        await dispatch(getVideosSubscribed(videoListPage.currentPageNumber + 1))
          .then((response) => {
            const newVideos = response.payload.data.content;
            if (newVideos && newVideos.length > 0) {
              const currentVideos = { ...videoListPage.content };
              const currentVideosArray = Object.values(currentVideos);
              const newVideosReturn = currentVideosArray.concat(newVideos);
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

  return (
    <div className={`${style.main} row`}>
      <div className={style.header}>
        <div className={style.tittle}>
          <p>Latest</p>
        </div>
        <div className={style.header__button}>
          <div className={style.header__button__manage}>
            <button>Manage</button>
          </div>
          <div className={style.header__button__menu}>
            <button onClick={() => setIsGridMode(true)}>
              <BsGrid3X2GapFill size={24} />
            </button>
            <button onClick={() => setIsGridMode(false)}>
              <BsListUl size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${style.content}`}>
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
      </div>
    </div>
  );
}
