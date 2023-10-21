import style from '../../../../assets/scss/watching/_playlistBox.module.scss'
import {FiMinimize2} from "react-icons/fi";
import {LuMoreVertical} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import {getPlaylist} from "../../../../api/playlistApi";
import VideoLine from "./VideoLine";

function PlaylistBox() {
    const dispatch = useDispatch();
    const playlists = useSelector(getPlaylist);
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.info__container}>
                        <span className={style.title}>Danh sách kết hợp - muahhehehehe</span>
                        <span className={style.description}>Mixes are playlists Youtube makes for you</span>
                    </div>
                    <div className={style.playlist__function}>
                        <FiMinimize2 size={23} className={style.button}/>
                        <LuMoreVertical size={23} className={style.button}/>
                    </div>
                </div>
                <div className={style.body}>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                    <VideoLine/>
                </div>
            </div>
        </>
    )
}

export default PlaylistBox;