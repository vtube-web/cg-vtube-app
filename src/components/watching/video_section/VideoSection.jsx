import style from "../../../assets/scss/watching/_videoSection.module.scss";
import {BiDislike, BiLike, BiSolidLike} from "react-icons/bi";
import {PiShareFatLight} from "react-icons/pi";
import ShowMore from "react-show-more-text";
import "react-show-more-text/lib/ShowMoreText.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import formatNumberView from "../../../format/FormatNumberView";
import {addSubscriber, removeSubscribed,} from "../../../features/video/subscriberSlice";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import {addLiked, removeVideoLiked,} from "../../../features/video/videoLikedSlice";
import handleShareClick from "../../../services/handleShareClick";
import {getInfoUser, selectUserInfo} from "../../../features/auth/userSlice";
import ReactPlayer from "react-player";
import formatDateAgo from "../../../format/FormatDateAgo";
import {getStoredUserData} from "../../../services/accountService";

function VideoSection({video}) {
    const dispatch = useDispatch();
    const [userDto, setUserDto] = useState({});
    const [description, setDescription] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector(selectUserInfo);
    const [userInfo, setUserInfo] = useState({});
    const [reRender, setReRender] = useState(true);
    const loggerUser = getStoredUserData();
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
        if (loggerUser) {
            if (!user || reRender) {
                dispatch(getInfoUser());
                setReRender(!reRender);
            }
            setUserInfo(user);
        }
    }, [video, user]);

    useEffect(() => {
        if (video && video.userDto && video.userDto.id) {
            const subscribed = isChannelSubscribed(video.userDto.id);
            const liked = isVideoLiked(video.id);
            setIsSubscribed(subscribed);
            setIsLiked(liked);
        }
    }, [video, user]);

    const isChannelSubscribed = (channelId) => {
        const subscribedChannels = userInfo && userInfo.subscriptions;
        return subscribedChannels ? subscribedChannels.includes(channelId) : false;
    };

    const isVideoLiked = (videoId) => {
        const listVideoLiked = userInfo && userInfo.likedVideos;
        return listVideoLiked ? listVideoLiked.includes(videoId) : false;
    };

    const handleSubscribeClick = (id) => {
        try {
            if (loggerUser) {
                if (isSubscribed) {
                    dispatch(removeSubscribed(id));
                } else {
                    dispatch(addSubscriber(id));
                }
                setIsSubscribed(!isSubscribed);
                setReRender(!reRender);
                toast.success(
                    isSubscribed ? "Subscription removed" : "Subscription added",
                    {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                );
            } else {
                toast.info("Sign in to subscribe to this channel.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Failed to subscribe/unsubscribe:", error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handleLikeClick = (id) => {
        try {
            if (loggerUser) {
                if (isLiked) {
                    dispatch(removeVideoLiked(id));
                } else {
                    dispatch(addLiked(id));
                }
                setIsLiked(!isLiked);
                toast.success(isLiked ? "Like removed" : "Like added", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.info("Sign in to make your opinion count.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Failed to like/unlike:", error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <>
            {video ? (
                <div className={`${style.watching__video}`}>
                    <div className={style.video__container}>
                        {video.videoUrl && (
                            <div className={style.custom__video__container}>
                                <ReactPlayer
                                    url={video.videoUrl}
                                    className={style.video__main}
                                    controls={true}
                                    pip={true}
                                    stopOnUnmount={false}
                                    width="96%"
                                    height="98.5%"
                                    playing={true}
                                    onError={(e) => console.error("Video error:", e)}
                                />
                            </div>
                        )}
                    </div>
                    <div className={style.video__title}>{video.title}</div>
                    <div className={`${style.video__info__function}`}>
                        <div className={style.info__channel}>
                            <img
                                className={style.channel__avatar}
                                src={userDto.avatar}
                                alt={"user avatar"}
                            />
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
                            <ToastContainer/>
                            <button
                                className={`${style.function__subscribe} ${
                                    isSubscribed ? "unsubscribed" : ""
                                }`}
                                onClick={() => handleSubscribeClick(userDto.id)}
                            >
                                {isSubscribed ? "Unsubscribe" : "Subscribe"}
                            </button>
                        </div>
                        <div className={style.function__channel}>
                            <button
                                className={`${style.function__like}`}
                                onClick={() => handleLikeClick(video.id)}
                            >
                                {isLiked ? <BiSolidLike size={20}/> : <BiLike size={20}/>}
                                <span>
                  {isLiked
                      ? formatNumberView(video.likes + 1)
                      : formatNumberView(video.likes)}
                </span>
                            </button>
                            <span className={`${style.function__dislike}`}>
                <BiDislike size={20}/>
              </span>
                            <button
                                className={style.function__share}
                                onClick={() => handleShareClick(video.id)}
                            >
                                <PiShareFatLight size={20}/>
                                Share
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <div className={`${style.video__details}`}>
                        <div className={`${style.details__description}`}>
                            <div className={`${style.details__info}`}>
                                <span>{formatNumberView(video.views)} views • </span>
                                <span>{formatDateAgo(video.createAt)}</span>
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
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default VideoSection;
