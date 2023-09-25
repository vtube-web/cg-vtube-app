import style from '../../assets/scss/Components/Watching/_suggestionBar.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoList} from "../../features/video/videoSlice";
import {useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import Video from "../../components/home/Video/Video";
import {SuggestionVideo} from "../../components/home/Video/SuggestionVideo";

export default function SuggestionBar() {
    return (
        <div className={style.suggestion__container}>
            <span>Quảng cáo</span>
            <div className={style.video__renderer}>
                <div className={style.video__display}>
                    <img
                        src="https://cdn.discordapp.com/attachments/1151490874195316856/1152992123059175694/b2c44a9549a5cf8c9eebb8eb8fc51213.jpg"
                        className={style.video__main}
                        alt="Suggestion video"
                    />
                </div>
                <div className={`${style.video__info} border border-info`}>
                    <video_title>Sample title</video_title>
                    <p>This is user name</p>
                    <p>Display like and views</p>
                </div>
            </div>
            <hr/>
            <div>
                <SuggestionVideo/>
            </div>
        </div>
    )
}