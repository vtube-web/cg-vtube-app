import VideoSection from "../../components/watching/video_section/VideoSection";
import CommentSection from "../../components/watching/comment_section/CommentSection";
import style from '../../assets/scss/watching/_watching.module.scss'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getVideo, resetVideoDetail, selectVideoDetail, selectVideoSuccess} from "../../features/video/videoSlice";
import {SuggestionVideo} from "../../components/watching/right_bar/SuggestionVideo";
import PlaylistBox from "../../components/watching/right_bar/playlist/PlaylistBox";
import {Helmet} from "react-helmet";
import {collectPlaylists} from "../../features/playlist/playlistSlice";
import {getStoredUserData} from "../../services/accountService";

export default function WatchingScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const video = useSelector(selectVideoDetail);
    const [displayVideo, setDisplayVideo] = useState({});
    const currentUser = getStoredUserData();
    const [currentPlaylist, setCurrentPlaylist] = useState([])
    useEffect(() => {
        setDisplayVideo(video);
    }, [video]);

    useEffect(() => {
        if (params) {
            dispatch(collectPlaylists(currentUser.id));
            dispatch(getVideo(params.videoId));
        }

        //cleanup function
        return () => {
            dispatch(resetVideoDetail())
        }
    }, [params.videoId]);
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{displayVideo.title}</title>
            </Helmet>
            <div className={style.watching__container}>
                <div className={`${style.watching__main} col-10`}>
                    <VideoSection video={displayVideo}/>
                    <CommentSection/>
                </div>
                <div className={`${style.watching__suggestion} col-2`}>
                    <PlaylistBox/>
                    <SuggestionVideo/>
                </div>
            </div>
        </>
    )
}