import SuggestionBar from "./SuggestionBar";
import VideoSection from "./VideoSection";
import CommentSection from "./CommentSection";
import {Row} from "react-bootstrap";
import style from '../../assets/scss/Components/Watching/_watching.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoList} from "../../features/video/videoSlice";
import {useEffect} from "react";
export default function WatchingScreen() {


    return (
        <>
            <div className={style.watching__container}>
                <div className={`${style.watching__main} col-10 border border-info`}>
                    <VideoSection/>
                    <CommentSection/>
                </div>
                <div className={`${style.watching__suggestion} col-2`}>
                    <SuggestionBar/>
                </div>
            </div>
        </>
    )
}