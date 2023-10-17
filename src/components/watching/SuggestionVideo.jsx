import {NavLink, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import style from '../../assets/scss/watching/_suggestionVideo.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoList} from "../../features/video/videoSlice";
import formatNumberView from "../../format/FormatNumberView";
import formatDate from "../../format/FormatDate";
import formatDateAgo from "../../format/FormatDateAgo";

export function SuggestionVideo() {
    const dispatch = useDispatch();
    const videoList = useSelector(selectVideoList);
    const param = useParams();
    useEffect(() => {
        if (videoList.length === 0) {
            dispatch(getVideos());
        }
    }, [param])

    return (
        <>
            {videoList.map(
                (suggestionVideo) => (
                    <NavLink to={`/watching/${suggestionVideo.id}`}>
                        <div className={style.suggestVideo}>
                            <div className={`${style.container__img} col-5`}>
                                <img src={suggestionVideo.thumbnail}
                                     alt={"video"}
                                     className={style.video__main}/>
                            </div>
                            <div className={`${style.video__info} col-6`}>
                                <span className={style.suggestVideo__title}>
                                    {suggestionVideo.title}
                                </span>
                                <span className={style.suggestVideo__channel}>
                                    {suggestionVideo.userDto.userName}
                                </span>
                                <span className={style.suggestVideo__details}>
                                    {formatNumberView(suggestionVideo.views)} views • {formatDateAgo(suggestionVideo.createAt)}
                                </span>
                            </div>
                        </div>
                    </NavLink>
                )
            )}
        </>
    )
}