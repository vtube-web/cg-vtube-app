import { useEffect, useState } from "react";

import "../../../assets/css/homeProfile/VideoProfile.css";
import NewestButton from "../common/button/NewestButton"
import OldestButton from "../common/button/OldestButton"
import PopularButton from "../common/button/PopularButton"
import { BiSolidLike } from "react-icons/bi";
import RenderVideosHomeProfile from "../common/list/RenderVideosHomeProfile"
import { useDispatch, useSelector } from "react-redux";
import { getVideoHomeProfile, selectVideoHomeProfileList } from "../../../features/video/videoHomeProfileSlice";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressSpinner } from "primereact/progressspinner";

function Video() {
  const [type, setType] = useState("Newest");
  const videoList = useSelector(selectVideoHomeProfileList);
  const [homeProfileVideoList, setHomeProfileVideoList] = useState({});
  const [showNoVideoMessage, setShowNoVideoMessage] = useState(false);

  const dispatch = useDispatch();

  const handleButtonClick = (typeName) => {
    setType(typeName);
    dispatch(getVideoHomeProfile({ userName: userName.slice(1), type: typeName }));
  };

  const { userName } = useParams();

  useEffect(() => {
    dispatch(getVideoHomeProfile({ userName: userName.slice(1), type: type }));
    setHomeProfileVideoList(videoList.content);
  }, [userName]);

  useEffect(() => {
    if (videoList.length == 0) {
      dispatch(getVideoHomeProfile({userName: userName.slice(1), type: type }));
    } else {
      setHomeProfileVideoList(videoList.content);
      setShowNoVideoMessage(Object.keys(videoList).length !== 0);
    }
  }, [videoList]);

    const filterVideos = () => {
      switch (type) {
        case "Oldest":
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
        case "Popular":
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
        default:
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
      }
    };

    const fetchMoreData = () => {
      setTimeout(async () => {
        if (videoList && videoList.hasNext) {
          await dispatch(
            getVideoHomeProfile({
              userName: userName.slice(1),
              type: type,
              page: videoList.currentPageNumber + 1,
            })
          )
            .then((response) => {
              const newVideos = response.payload.data.content;
              if (newVideos && newVideos.length > 0) {
                const currentVideos = { ...videoList.content };
                const currentVideosArray = Object.values(currentVideos);
                const newVideosReturn = currentVideosArray.concat(newVideos);
                setHomeProfileVideoList(newVideosReturn);
              } else {
                console.log("No videos received");
              }
            })
            .catch((error) => {
              console.error("Error Fetching more data:", error);
            });
        }
      }, 1500);
    };

  return (
    <div className="container">
      <div className="container d-flex video-profile-block-button p-0">
        {showNoVideoMessage ? (
          <>
            <NewestButton
              active={type === "Newest"}
              onClick={handleButtonClick}
            />
            <OldestButton
              active={type === "Oldest"}
              onClick={handleButtonClick}
            />
            <PopularButton
              active={type === "Popular"}
              onClick={handleButtonClick}
            />
          </>
        ) : null}
      </div>
      <InfiniteScroll
        dataLength={Object.keys(homeProfileVideoList || {}).length}
        next={fetchMoreData}
        hasMore={videoList && videoList.hasNext}
        loader={<ProgressSpinner style={{ width: "50px", height: "50px" }} />}
        className="custom-infinite-scroll"
      >
        {showNoVideoMessage ? (
          filterVideos()
        ) : (
          <div>
            <BiSolidLike size={100} />
            <h3>There are no videos in your channel yet</h3>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Video;
