import {NavLink} from "react-router-dom";
import {AiFillEye} from "react-icons/ai";
import React, {useEffect} from "react";
import style from '../../../assets/scss/Components/Watching/_suggestionVideo.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoList} from "../../../features/video/videoSlice";

export function SuggestionVideo() {
    const dispatch = useDispatch();
    const videoList = useSelector(selectVideoList);

    useEffect(() => {
        if (videoList.length === 0) {
            dispatch(getVideos());
            console.log("Getting videos...")
        }
    }, [])

    return (
        <>
            {videoList.map(
                (suggestionVideo) => (
                    <NavLink to={"/testingSuggestionVideo"}>
                        <div className={style.suggestVideo}>
                            <div className={style.video__main}>
                                <img src={suggestionVideo.thumbnails} alt={"video"}/>
                                <span>{suggestionVideo.duration}s</span>

                                <div className={style.suggestVideo__title}>
                                    {suggestionVideo.title}
                                </div>

                                <div className={style.suggestVideo__details}>
                                    <span><AiFillEye/>{suggestionVideo.views} views • </span>
                                    <span>{suggestionVideo.createdAt}</span>
                                </div>

                                <div className={style.suggestVideo__channel}>
                                    <img src={suggestionVideo.avatar} alt={'channel_name'}/>
                                    <p>{suggestionVideo.title}</p>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                )
            )}
        </>
    )
}