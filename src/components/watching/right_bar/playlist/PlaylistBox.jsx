import style from '../../../../assets/scss/watching/_playlistBox.module.scss'
import {FiMinimize2} from "react-icons/fi";
import {LuMoreVertical} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import VideoLine from "./VideoLine";
import {collectWatchedPlaylist, selectWatchedPlaylist} from "../../../../features/playlist/playlistSlice";
import {useEffect, useState} from "react";

function PlaylistBox({playlist}) {
    const dispatch = useDispatch();
    const playlistData = useSelector(selectWatchedPlaylist);
    const [currentPlaylist, setCurrentPlaylist] = useState(playlistData);
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        if (playlistData == null) {
            dispatch(collectWatchedPlaylist())
            setCurrentPlaylist(playlistData);
            setVideoList(currentPlaylist.videoResponseDtoList)
        }
    }, [playlist])
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.info__container}>
                        <span className={style.title}>
                            {currentPlaylist.title}
                        </span>
                        <span className={style.description}>
                            Mixes are playlists Vtube makes for you
                        </span>
                    </div>
                    <div className={style.playlist__function}>
                        <FiMinimize2 size={23} className={style.button}/>
                        <LuMoreVertical size={23} className={style.button}/>
                    </div>
                </div>
                <div className={style.body}>
                    {Array.isArray(videoList) && videoList.length > 0 ? (
                        videoList.map((video) => (
                            <VideoLine video={video}/>
                        ))
                    ) : (
                        <p>No videos in playlist</p>
                    )}
                    <VideoLine/>
                </div>
            </div>
        </>
    )
}

export default PlaylistBox;