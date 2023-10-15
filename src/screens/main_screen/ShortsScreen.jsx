import {useDispatch, useSelector} from "react-redux";
import {getVideoShorts, selectVideoShorts} from "../../features/shorts/shortsSlice";
import React, {useEffect} from "react";
import Shorts from "../../components/home/shorts/Shorts";
import style from "../../assets/scss/main_screen/shorts/_shorts.module.scss";
import {selectVideoList} from "../../features/video/videoSlice";
import ReactPlayer from 'react-player';

function ShortsScreen() {
    const dispatch = useDispatch();
    const videoShortsList = useSelector(selectVideoShorts);
    const videoList = useSelector(selectVideoList);

    useEffect(() => {
        dispatch(getVideoShorts());
    }, [])


    return (
        <div className={style.shorts__container}>
            <div className={style.shorts__content}>
                {videoShortsList.map(
                    (videoShort) => (
                        <Shorts
                            key={videoShort.id}
                            videoShort={videoShort}/>
                    ))}

            </div>
        </div>
    )
}

export default ShortsScreen;