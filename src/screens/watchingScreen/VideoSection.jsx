import style from '../../assets/scss/Components/Watching/_videoSection.module.scss'
import {
    BiSolidLike, BiLike,
    BiSolidDislike, BiDislike,
    BiSolidHelpCircle, BiHelpCircle,
    BiSolidMusic, BiMusic,
    BiSolidTrophy, BiTrophy
} from "react-icons/bi"
import {
    PiShareFatLight,
} from "react-icons/pi";
import ShowMore from 'react-show-more-text'
import "react-show-more-text/lib/ShowMoreText.css"
import sample from '../../assets/video/sample.mp4'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function VideoSection({video = {}}) {
    const tagList = video?.tagDtoList;
    const [userDto, setUserDto] = useState({})

    useEffect(()=>{
        setUserDto(video.userDto)
    },[video])

    return (
        <>
            <div className={`${style.watching__video}`}>
                <div>
                    {/*<video*/}
                    {/*    src={sample}*/}
                    {/*    className={`${style.video__main}`}*/}
                    {/*    controls*/}
                    {/*/>*/}
                    <img src={video.videoUrl} alt={"Video"} className={`${style.video__main}`}/>
                </div>
                <div className={style.video__title}>
                    {video.title}
                </div>
                <div className={`${style.video__info__function}`}>
                    <div className={style.info__channel}>
                        <img className={style.channel__avatar}
                             src={userDto.avatar}
                             alt={"user avatar"}/>
                        <div className={style.channel__info}>
                            <Link to={"/"}>
                                <span className={style.channel__name}>
                                    {userDto.userName}
                                </span>
                            </Link>
                            <span className={style.channel__subscribers}>
                                40m Subscribers
                            </span>
                        </div>
                        <div className={`${style.function__subscribe}`}>
                            Subscribe
                        </div>
                    </div>
                    <div className={style.function__channel}>
                        <span className={`${style.function__like}`}>
                            <BiLike size={20}/>
                            <span>{video.like}</span>
                        </span>
                        <span className={`${style.function__dislike}`}>
                            <BiDislike size={20}/>
                        </span>
                        <span className={style.function__share}>
                            <PiShareFatLight size={20}/>
                            Share
                        </span>
                    </div>
                </div>
                <hr/>
                <div className={`${style.video__details}`}>
                    <div className={`${style.details__description}`}>
                        <div className={`${style.details__info}`}>
                            <span>{video.views}</span>
                            <span>{video.createAt}</span>
                            {/*<span>{tagList.map(*/}
                            {/*    (tag, index) => (*/}
                            {/*            {index > 0 && " "}*/}
                            {/*            #${tag}*/}
                            {/*    )*/}
                            {/*)}</span>*/}
                        </div>
                        <ShowMore
                            lines={3}
                            more={"SHOW MORE"}
                            less={"SHOW LESS"}
                            anchorClass={style.showMore}
                            expanded={false}
                            keepNewLines={true}
                        >
                            {video.description}
                        </ShowMore>
                    </div>
                </div>
            </div>
        </>
    )

}
