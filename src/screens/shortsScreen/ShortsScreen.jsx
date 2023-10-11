import {useDispatch, useSelector} from "react-redux";
import {getVideoShorts, selectVideoShorts} from "../../features/videoShorts/videoShorts";
import React, {useEffect} from "react";
import VideoShorts from "../../components/home/Video/VideoShorts";
import style from "../../assets/scss/Components/Shorts/_shorts.module.scss";
import {selectVideoList} from "../../features/video/videoSlice";


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
                {videoList.map(
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