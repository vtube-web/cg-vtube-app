import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import style from '../../../assets/scss/watching/_suggestionVideo.module.scss'
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
                        <div className={style.suggestVideo}

                        >
                            <img src={suggestionVideo.thumbnails}
                                 alt={"video"}
                                 className={style.video__main}
                                 style={{
                                     minWidth: "170px",
                                     maxWidth: "170px",
                                     minHeight: "110px",
                                     maxHeight: "110px"
                                 }}
                            />
                            <div className={style.video__info}
                                style={{
                                    maxHeight: "110px",
                                    minHeight: "110px"
                                }}
                            >
                                <span className={style.suggestVideo__title}>
                                    {suggestionVideo.title}
                                </span>
                                <span className={style.suggestVideo__channel}>
                                    {suggestionVideo.channelName}
                                </span>
                                <span className={style.suggestVideo__details}>
                                    {suggestionVideo.views} views • 1000 years ago
                                </span>
                            </div>
                        </div>
                    </NavLink>
                )
            )}
        </>
    )
}