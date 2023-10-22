import style from "../../../assets/scss/main_screen/shorts/_videoShorts.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {BsPlayFill, BsPauseFill} from "react-icons/bs";
import {IoIosMore, IoMdVolumeHigh, IoMdVolumeOff} from "react-icons/io";
import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import {FaCommentDots} from "react-icons/fa";
import {PiShareFatFill} from "react-icons/pi";
import formatNumberView from "../../../format/FormatNumberView";
import ReactPlayer from "react-player";
import {CgDetailsMore} from "react-icons/cg";
import {AiOutlineClose} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {getVideoShorts} from "../../../features/shorts/shortsSlice";
import CommentShorts from "./CommentsShorts/CommentShorts";
import {InputTextarea} from "primereact/inputtextarea";
import {addComment} from "../../../features/comment_reply/commentSlice";
import {getStoredUserData} from "../../../services/accountService";
import {useNavigate, useParams} from "react-router-dom";
import {addCommentShorts} from "../../../features/comment_reply/commentShortsSlice";

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

    const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI4NDc2*_ga_CW55HF8NVT*MTY5NzEyNTg4NC4yOC4xLjE2OTcxMjU5MjAuMjQuMC4w';

    useEffect(() => {
        setCommentShortList(videoShort.commentShortsDtoList)
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
        shortsId: videoShort.id
    }

    const handleCommentShorts = async (e) => {
        e.preventDefault();
        const newCommentShorts = {
            content: commentShorts,
            shortsId: params.shortsId,
            likes: 0,
            dislikes: 0,
            createAt: Date.now(),
            replyDtoList: [],
            userResponseDto: {
                id: loggedUser.id,
                userName: loggedUser.email,
                avatar: loggedUser.avatar || imgUrl
            }
        }
        const updatedCommentShortsList = [newCommentShorts, ...commentShortList];
        dispatch(addCommentShorts(commentShortsData));
        setCommentShortList(updatedCommentShortsList);
        setCommentShorts("");
    }

    function handleCheckLogin() {
        if (loggedUser === null) {
            navigate("/login");
        }
    }

    return (
        <>
            <div className={style.container}>

                <div className={`${style.video_shorts__container} ${commentsToggle && style.active}`}>

                    <div className={style.color__shorts}>
                        <ReactPlayer
                            id="myVideo"
                            className={`${style.shorts__main}`}
                            url={videoShort.shortsUrl}
                            controls={false}
                            ref={playerRef}
                            onClick={handlePlayClick}
                            OnUnstarted
                            loop
                            width='100%'
                            height='82vh'
                            onError={(e) => console.error("Video error:", e)}
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
                                        <img src={videoShort?.userDto?.avatar} alt={'channel_name'}/>
                                        <p>{videoShort?.userDto?.userName}</p>
                                    </div>
                                    <span className={style.subs__btn}>Subscribe</span>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className={`${style.btn__container} ${commentsToggle && style.active}`}>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <BiSolidLike/>
                            </div>

                        </div>
                        <span>{formatNumberView(videoShort.likes)}</span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <BiSolidDislike/>
                            </div>

                        </div>
                        <span>{formatNumberView(videoShort.dislikes)}</span>


                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}
                                 onClick={handleCommentsClick}>
                                <FaCommentDots/>
                            </div>

                        </div>
                        <span>5</span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <PiShareFatFill/>
                            </div>

                        </div>
                        <span>Chia sẻ</span>

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
                            <i>5</i>
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
                            (commentShorts)=>(
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
                                onSubmit={handleCommentShorts}>
                                <InputTextarea
                                    rows={1}
                                    className={style.input__comments}
                                    value={commentShorts}
                                    placeholder={"Your comment"}
                                    onChange={(e) => setCommentShorts(e.target.value)}
                                    onFocus={handleCheckLogin}
                                    autoResize
                                />
                            </form>
                            <button onClick={handleCommentShorts}>
                                <span className={style.btn__comments}>Bình luận</span>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Shorts;