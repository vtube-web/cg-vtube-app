import style from "../../../assets/scss/main_screen/shorts/_videoShorts.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {BsPlayFill, BsPauseFill} from "react-icons/bs";
import {IoIosMore, IoMdVolumeHigh, IoMdVolumeOff} from "react-icons/io";
import {BiDislike, BiLike, BiSolidDislike, BiSolidLike} from "react-icons/bi";
import {FaCommentDots} from "react-icons/fa";
import {PiShareFatFill} from "react-icons/pi";
import formatNumberView from "../../../format/FormatNumberView";
import ReactPlayer from "react-player";
import {CgDetailsMore} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import CommentShorts from "./CommentsShorts/CommentShorts";
import {InputTextarea} from "primereact/inputtextarea";
import {getStoredUserData} from "../../../services/accountService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {addCommentShorts} from "../../../features/comment_reply/commentShortsSlice";
import {addLikeOrDislikeVideo} from "../../../features/video/videoLikedSlice";
import {toast, ToastContainer} from "react-toastify";
import {getInfoUser, selectUserInfo} from "../../../features/auth/userSlice";
import {addSubscriber, removeSubscribed} from "../../../features/video/subscriberSlice";
import {useFormik} from 'formik';

function Shorts({videoShort}) {

    const [playToggle, setPlayToggle] = useState(false);
    const [volumeToggle, setVolumeToggle] = useState(false);
    const [commentsToggle, setCommentsToggle] = useState(false);
    const playerRef = useRef(null);
    const [commentShortList, setCommentShortList] = useState([]);
    const dispatch = useDispatch();
    const params = useParams();
    const [commentShorts, setCommentShorts] = useState("");
    const loggedUser = getStoredUserData();
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const user = useSelector(selectUserInfo);
    const [userInfo, setUserInfo] = useState({});
    const [userDto, setUserDto] = useState({});
    const [description, setDescription] = useState("");
    const [reRender, setReRender] = useState(true);


    const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI4NDc2*_ga_CW55HF8NVT*MTY5NzEyNTg4NC4yOC4xLjE2OTcxMjU5MjAuMjQuMC4w';


    useEffect(() => {
        if (videoShort) {
            setCommentShortList(videoShort.commentShortsDtoList);
        }
    }, [])

    const handlePlayClick = () => {
        setPlayToggle((prevPlayToggle) => {
            if (playerRef.current) {
                const internalPlaying = playerRef.current.getInternalPlayer();
                if (internalPlaying.paused) {
                    internalPlaying.play();
                } else {
                    internalPlaying.pause();
                }
            }
            return !prevPlayToggle;
        })
    }

    const handleVolumeClick = () => {
        setVolumeToggle(!volumeToggle);
        if (playerRef.current) {
            const internalVolume = playerRef.current.getInternalPlayer();
            if (internalVolume.muted) {
                internalVolume.muted = false;
                setVolumeToggle(false);
            } else {
                internalVolume.muted = true;
                setVolumeToggle(true);
            }
        }

    }

    const handleCommentsClick = () => {
        setCommentsToggle(!commentsToggle);
    }

    const commentShortsData = {
        content: commentShorts,
        videoId: videoShort.id
    }

    const handleCommentShorts = async () => {
            const newCommentShorts = {
                content: commentShorts,
                videoId: params.videoId,
                likes: 0,
                dislikes: 0,
                createAt: Date.now(),
                replyDtoList: [],
                userResponseDto: {
                    id: loggedUser.id,
                    userName: loggedUser.userName,
                    avatar: loggedUser.avatar || imgUrl
                }
            }
            const updatedCommentShortsList = [newCommentShorts, ...commentShortList];
            dispatch(addCommentShorts(commentShortsData));
            setCommentShortList(updatedCommentShortsList);
    }

    function handleInputChange(event) {
        setCommentShorts(event.target.value);
    }

    function handleCheckLogin() {
        if (loggedUser === null) {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (videoShort) {
            if (videoShort.userDto) {
                setUserDto(videoShort.userDto);
            }
            const des = videoShort.description;
            if ("string" === typeof des) {
                setDescription(videoShort.description);
            }
        }
        if (loggedUser) {
            if (!user || reRender) {
                dispatch(getInfoUser());
                setReRender(!reRender);
            }
            setUserInfo(user);
        }
    }, [videoShort, user]);

    useEffect(() => {
        if (videoShort && videoShort.userDto && videoShort.userDto.id) {
            const subscribed = isChannelSubscribed(videoShort.userDto.id);
            const liked = isVideoLiked(videoShort.id);
            const disliked = isVideoDisliked(videoShort.id);
            setIsSubscribed(subscribed);
            setIsLiked(liked);
            setIsDisliked(disliked);
        }
    }, [videoShort, user]);

    const isChannelSubscribed = (channelId) => {
        const subscribedChannels = userInfo && userInfo.subscriptions;
        return subscribedChannels ? subscribedChannels.includes(channelId) : false;
    };

    const isVideoLiked = (videoId) => {
        const listVideoLiked = userInfo && userInfo.likedVideos;
        return listVideoLiked ? listVideoLiked.includes(videoId) : false;
    };

    const isVideoDisliked = (videoId) => {
        const listVideoDisliked = userInfo && userInfo.disLikedVideos;
        return listVideoDisliked ? listVideoDisliked.includes(videoId) : false;
    };

    const isVideoOwner = (videoId) => {
        const listVideoOwner = userInfo && userInfo.videoList;
        return listVideoOwner ? listVideoOwner.includes(videoId) : false;
    };

    const handleSubscribeClick = (id) => {
        try {
            if (loggedUser) {
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
                        position: "bottom-left",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                );
            } else {
                toast.info("Sign in to subscribe to this channel.", {
                    position: "bottom-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Failed to subscribe/unsubscribe:", error, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleLikeClick = (id, likeStatus) => {
        try {
            if (loggedUser) {
                if (isDisliked) {
                    setIsDisliked(false);
                }
                if (isLiked) {
                    dispatch(addLikeOrDislikeVideo({id, likeStatus}));
                    setIsLiked(false);
                } else {
                    dispatch(addLikeOrDislikeVideo({id, likeStatus}));
                    setIsLiked(true);
                }
            } else {
                toast.info("Sign in to like to this video.", {
                    position: "bottom-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Failed to like/unlike:", error, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleDislikeClick = (id, likeStatus) => {
        try {
            if (loggedUser) {
                if (isLiked) {
                    setIsLiked(false);
                }
                if (isDisliked) {
                    dispatch(addLikeOrDislikeVideo({id, likeStatus}));
                    setIsDisliked(false);
                } else {
                    dispatch(addLikeOrDislikeVideo({id, likeStatus}));
                    setIsDisliked(true);
                }
            } else {
                toast.info("Sign in to dislike to this video.", {
                    position: "bottom-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Failed to like/unlike:", error, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };


    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.content) {
                errors.content = 'Content is required.';
            }

            return errors;
        },
        onSubmit: (values) => {
            values && handleCommentShorts(values);
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className={style.input__comments}>{formik.errors[name]}</small> : <small className={style.input__comments}>&nbsp;</small>;
    };

    return (
        <>
            <ToastContainer/>
            <div className={style.container}>

                <div className={`${style.video_shorts__container} ${commentsToggle && style.active}`}>

                    <div className={style.color__shorts}>
                        <ReactPlayer
                            id="myVideo"
                            className={`${style.shorts__main}`}
                            url={videoShort.videoUrl}
                            controls={false}
                            ref={playerRef}
                            onClick={handlePlayClick}
                            onUnstarted
                            loop
                            width='100%'
                            height='82vh'
                        />
                        <div className={style.shorts__top}>
                            <div
                                onClick={handlePlayClick}>
                                {playToggle
                                    ? <BsPauseFill size={23}/>
                                    : <BsPlayFill size={23}/>}
                            </div>
                            <div
                                onClick={handleVolumeClick}>
                                {volumeToggle
                                    ? <IoMdVolumeOff size={23}/>
                                    : <IoMdVolumeHigh size={23}/>}
                            </div>
                        </div>

                        <div className={style.shorts__bottom}>

                            <div className={style.shorts__info}>

                                <div className={style.shorts__content}>
                                    {videoShort.title}
                                </div>

                                <div className={style.shorts__user}>
                                    <div className={style.user__info}>
                                        <Link to={`/homeProfile/${userDto?.userName}/*`}>
                                            <img src={videoShort?.userDto?.avatar} alt={'channel_name'}/>
                                        </Link>

                                        <Link to={`/homeProfile/${userDto?.userName}/*`}>
                                            <p>{videoShort?.userDto?.userName}</p>
                                        </Link>
                                    </div>
                                    {!isVideoOwner(videoShort.id) ? (
                                        <span
                                            className={`${style.subs__btn} `}
                                            onClick={() => handleSubscribeClick(userDto.id)}
                                        >
                                        {isSubscribed ? (
                                            <span
                                                className={`${style.subs__btn} ${style.active} `}>
                                                <div className={`${style.bg__button}`}></div>
                                                <div className={`${style.text_color}`}>
                                                    <p> Subscribed </p>
                                                </div>
                                            </span>
                                        ) : (
                                            <span
                                                className={` ${style.bg__btn}`}>
                                                Subscribe
                                            </span>
                                        )}
                                        </span>
                                    ) : (
                                        <button>Manage video</button>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className={`${style.btn__container} ${commentsToggle && style.active}`}>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}
                                 onClick={() => handleLikeClick(videoShort.id, true)}>
                                {isLiked ? (
                                    <BiSolidLike size={20}/>
                                ) : (
                                    <BiLike size={20}/>
                                )}
                            </div>

                        </div>
                        <span>
                            {isLiked
                                ? formatNumberView(videoShort.likes + 1)
                                : formatNumberView(videoShort.likes)}
                        </span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}
                                 onClick={() => handleDislikeClick(videoShort.id, false)}>
                                {isDisliked ? (
                                    <BiSolidDislike size={20}/>
                                ) : (
                                    <BiDislike size={20}/>
                                )}
                            </div>

                        </div>
                        <span>Dislike</span>


                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}
                                 onClick={handleCommentsClick}>
                                <FaCommentDots/>
                            </div>

                        </div>
                        <span>{commentShortList.length}</span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <PiShareFatFill/>
                            </div>

                        </div>
                        <span>Share</span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <IoIosMore/>
                            </div>

                        </div>
                    </div>

                </div>

                <div className={`${style.comments__container} ${commentsToggle && style.active}`}>

                    <div className={style.comments__header}>

                        <div className={style.comments__views}>
                            <span>Bình luận</span>
                            <i>{commentShortList.length}</i>
                        </div>

                        <div className={style.comments__btn__details}>
                            <CgDetailsMore/>
                        </div>

                        <div className={style.comments__btn__cancel}>
                            {/*<AiOutlineClose/>*/}
                        </div>

                    </div>


                    <div className={style.comments__middle}>
                        {commentShortList.map(
                            (commentShorts) => (
                                <CommentShorts
                                    key={commentShorts.id}
                                    commentShorts={commentShorts}
                                />
                            ))}
                    </div>

                    <div className={style.comments__bottom}>

                        <div className={style.function__comments}>
                            <img
                                src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                                alt={"user avatar"}/>
                            <form
                                onSubmit={formik.handleSubmit}>
                                <InputTextarea
                                    name="content"
                                    component="input"
                                    rows={1}
                                    value={formik.values.content}
                                    className={`${style.input__comments}`}
                                    onFocus={handleCheckLogin}
                                    onInput={handleInputChange}
                                    onChange={(e) => {
                                        formik.setFieldValue('content', e.target.value);

                                    }}
                                />
                                <button>
                                    <span className={style.btn__comments}>Comment</span>
                                </button>
                                {getFormErrorMessage('content')}
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Shorts;