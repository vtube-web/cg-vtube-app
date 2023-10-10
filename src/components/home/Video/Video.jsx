import React from 'react'
import style from '../../../assets/scss/Components/Home/_video.module.scss'
import formatNumberView from "../../../format/FormatNumberView";
import {AiFillEye} from 'react-icons/ai'


import {NavLink} from "react-router-dom";
import formatDate from "../../../format/FormatDate";

function Video({video,isSidebarOpen }) {
    const videoClassName = isSidebarOpen
        ? style.video
        : `${style.video} ${style.videoLarge}`;
    return (
        <NavLink to={`/watching/${video.id}`}>
            <div className={style.video}>
                <div className={style.video__top}>
                    <div className={style.video__background}
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    <img src={video.thumbnail}
                         alt="thumbnail"
                         className={style.video__thumbnail} />
                </div>
                <div className={style.video__title}>
                    {video.title}
                </div>
                <div className={style.video__detail}>
                    <span>{formatNumberView(video.views)} views • </span>
                    <span>{formatDate(video.createAt)}</span>
                </div>
                <div className={style.video__channel}>
                    <img src={video.userDto.avatar} alt={'channel_name'}/>
                    <span>{video.userDto.userName}</span>
                </div>
            </div>
        </NavLink>
    )
}

export default Video;