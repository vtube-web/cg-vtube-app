import style from "../../../assets/scss/Components/Shorts/_videoShorts.module.scss";
import React, {useState} from "react";
import {BsPlayFill, BsPauseFill} from "react-icons/bs";
import {IoIosMore, IoMdVolumeHigh, IoMdVolumeOff} from "react-icons/io";
import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import {FaCommentDots} from "react-icons/fa";
import {PiShareFatFill} from "react-icons/pi";
import {CgDetailsMore} from "react-icons/cg";
import {AiOutlineClose} from "react-icons/ai";


function VideoShorts({videoShort}) {

    const [playToggle, setPlayToggle] = useState(false);
    const [volumeToggle, setVolumeToggle] = useState(false);
    const [commentsToggle, setCommentsToggle] = useState(false);

    const handlePlayClick = () => {
        setPlayToggle(!playToggle);
    }

    const handleVolumeClick = () => {
        setVolumeToggle(!volumeToggle);
    }

    const handleCommentsClick = () => {
        setCommentsToggle(!commentsToggle);
    }


    return (
        <>
            <div className={style.container}>

                <div className={style.video_shorts__container}>

                    <div className={style.color__shorts}>

                        <img className={style.shorts__main}
                             src={videoShort.content}
                             alt={"short"}/>

                        <div className={style.shorts__top}>
                            <div
                                onClick={handlePlayClick}>
                                {playToggle
                                    ? <BsPlayFill size={23}/>
                                    : <BsPauseFill size={23}/>}
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
                                        <img src={videoShort.avatar} alt={'channel_name'}/>
                                        <p>{videoShort.userName}</p>
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
                        <span>13 N</span>

                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}>
                                <BiSolidDislike/>
                            </div>

                        </div>
                        <span>Không ...</span>


                        <div className={style.shorts__btn}>

                            <div className={style.background__btn}
                                 onClick={handleCommentsClick}>
                                <FaCommentDots/>
                            </div>

                        </div>
                        <span>103</span>

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
                            <i>12 N</i>
                        </div>

                        <div className={style.comments__btn__details}>
                            <CgDetailsMore/>
                        </div>

                        <div className={style.comments__btn__cancel}>
                            <AiOutlineClose/>
                        </div>

                    </div>

                    <div className={style.comments__bottom}>

                        <div className={style.function__comments}>
                            <img src={videoShort.avatar} alt={'channel_name'}/>
                            <input type="text"
                                   placeholder=" Your comments"
                                   className={style.input__comments}/>

                            <button type="submit">
                                <span className={style.btn__comments}>Bình luận</span>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default VideoShorts;