import VideoSection from "../../components/watching/video_section/VideoSection";
import CommentSection from "../../components/watching/comment_section/CommentSection";

import style from '../../assets/scss/Components/Watching/_watching.module.scss'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getVideo, resetVideoDetail, selectVideoDetail, selectVideoSuccess} from "../../features/video/videoSlice";


export default function WatchingScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const video = useSelector(selectVideoDetail);
    const [displayVideo, setDisplayVideo] = useState({});

    useEffect(() => {
        setDisplayVideo(video);
    }, [video]);

    useEffect(() => {
        if (params) {
            dispatch(getVideo(params.videoId));
        }

        //cleanup function
        return () =>{
            dispatch(resetVideoDetail())
        }
    }, [params.videoId]);



    return (
        <>
            <div className={style.watching__container}>
                <div className={`${style.watching__main} col-10`}>
                    <VideoSection video={displayVideo}/>
                    <CommentSection/>
                </div>
                <div className={`${style.watching__suggestion} col-2`}>
                    {/*SuggestionVideo not ready*/}
                </div>
            </div>
        </>
    )
}