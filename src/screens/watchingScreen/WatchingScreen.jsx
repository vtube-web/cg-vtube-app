import VideoSection from "./VideoSection";
import CommentSection from "./CommentSection";

import style from '../../assets/scss/Components/Watching/_watching.module.scss'
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getVideo, selectVideoSuccess} from "../../features/video/videoSlice";


export default function WatchingScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const videoSuccess = useSelector(selectVideoSuccess);
    console.log("WatchingScreen rendering -------------------------")

    useEffect(() => {
        if (params) {
            dispatch(getVideo(params.videoId));
        }
    }, [params]);
    return (
        <>
            <div className={style.watching__container}>
                <div className={`${style.watching__main} col-10`}>
                    <VideoSection/>
                    <CommentSection/>
                </div>
                <div className={`${style.watching__suggestion} col-2`}>
                    {/*SuggestionVideo not ready*/}
                </div>
            </div>
        </>
    )
}