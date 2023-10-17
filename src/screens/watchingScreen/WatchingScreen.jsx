import SuggestionBar from "./SuggestionBar";
import VideoSection from "./VideoSection";
import CommentSection from "./CommentSection";
import { Row } from "react-bootstrap";
import style from "../../assets/scss/Components/Watching/_watching.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, selectVideoList } from "../../features/video/videoSlice";
import React, { useEffect } from "react";
import CategoriesBar from "../../components/home/CategoriesBar/CategoriesBar";
import ReactGA from "react-ga4";
import { useParams } from "react-router-dom";

export default function WatchingScreen() {
  const { videoId } = useParams();
  useEffect(() => {
    ReactGA.initialize("G-8PSHMEKBS6");
    ReactGA.send({
      hitType: "pageview",
      page: "/watching/" + videoId, 
    });
  }, []);

  useEffect(() => {
    ReactGA.event({ category: "Video", action: "Watching", label: videoId });
  }, [videoId]);


  return (
    <>
      <div className={style.watching__container}>
        <div className={`${style.watching__main} col-10`}>
          <VideoSection />
          <CommentSection />
        </div>
        <div className={`${style.watching__suggestion} col-2`}>
          <SuggestionBar />
        </div>
      </div>
    </>
  );
}
