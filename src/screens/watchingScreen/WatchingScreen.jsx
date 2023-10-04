import SuggestionBar from "./SuggestionBar";
import VideoSection from "./VideoSection";
import CommentSection from "./CommentSection";

import style from '../../assets/scss/Components/Watching/_watching.module.scss'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getVideo, selectVideoDetail} from "../../features/video/videoSlice";


export default function WatchingScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const videoDetails = useSelector(selectVideoDetail);


    useEffect(() => {
        console.log('params')
        console.log(params)
        if (params) {
            dispatch(getVideo(params.videoId));
        }
    },[])

    return (
        <>
            <div className={style.watching__container}>
                <div className={`${style.watching__main} col-10`}>
                    <VideoSection video={videoDetails}/>
                    <CommentSection comments={videoDetails}/>
                </div>
                <div className={`${style.watching__suggestion} col-2`}>
                    <SuggestionBar/>
                </div>
            </div>
        </>
    )
}