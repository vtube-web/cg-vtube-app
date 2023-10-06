import {Container, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getVideoShorts, selectVideoShorts} from "../../features/videoShorts/videoShorts";
import React, {useEffect} from "react";
import VideoShorts from "../../components/home/Video/VideoShorts";
import style from "../../assets/scss/Components/Shorts/_shorts.module.scss";
import {BiSolidLike, BiSolidDislike} from "react-icons/bi";
import {FaCommentDots} from "react-icons/fa";
import {PiShareFatFill} from "react-icons/pi";
import {IoIosMore} from "react-icons/io";


function ShortsScreen() {
    const dispatch = useDispatch();
    const videoShortsList = useSelector(selectVideoShorts);
    useEffect(() => {

        dispatch(getVideoShorts());

    }, [])

    return (
        <div className={style.shorts__container}>
            <div className={style.shorts__content}>
                {videoShortsList.map(
                    (videoShort) => (
                        <VideoShorts
                            key={videoShort.id}
                            videoShort={videoShort}/>
                    ))}

            </div>
        </div>
    )
}

export default ShortsScreen;