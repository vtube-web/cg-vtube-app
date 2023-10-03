import React from 'react'
import style from '../../../assets/scss/Components/Home/_video.module.scss'

import {AiFillEye} from 'react-icons/ai'
import {NavLink} from "react-router-dom";

function Video({video,isSidebarOpen }) {
    const videoClassName = isSidebarOpen
        ? style.video
        : `${style.video} ${style.videoLarge}`;
    return (
        <NavLink to={"/watching"}>
            <div className={style.video}>
                <div className={style.video__top}>
                    <img src={video.videoUrl} alt={"video"}/>
                </div>
                <div className={style.video__title}>
                    {video.title}
                </div>
                <div className={style.video__detail}>
                    <span>{video.views} views • </span>
                    <span>{video.createdAt}</span>
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