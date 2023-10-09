import style from '../../assets/scss/Components/Watching/_videoSection.module.scss'
import {BiDislike, BiLike,} from "react-icons/bi"
import {PiShareFatLight,} from "react-icons/pi";
import ShowMore from 'react-show-more-text'
import "react-show-more-text/lib/ShowMoreText.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function VideoSection({video}) {
    const [userDto, setUserDto] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (video) {
            if (video.userDto) {
                setUserDto(video.userDto);
            }
            const des = video.description;
            if ("string" === typeof des) {
                setDescription(video.description);
            }
        }

    }, [video]);


    return (
        <>
            {video
                ? <div className={`${style.watching__video}`}>
                    <div className={style.video__container}>
                        {video.videoUrl && <video className={`${style.video__main}`}
                                                  controls
                                                  autoPlay
                                                  onError={(e) => console.error("Video error:", e)}>
                            <source src={video.videoUrl} type={'video/mp4'}/>
                        </video>}
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
                            <div className={`${style.function__subscribe}`}>Subscribe</div>
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
                                <span>{video.views} views ***</span>
                                <span>{video.createAt}</span>
                            </div>
                            <ShowMore
                                lines={4}
                                more={"SHOW MORE"}
                                less={"SHOW LESS"}
                                anchorClass={style.showMore}
                                expanded={false}
                                keepNewLines={true}
                            >
                                {description}
                            </ShowMore>
                        </div>
                    </div>
                </div>
                : <div>Loading...</div>
            }

        </>
    )
}

export default VideoSection
