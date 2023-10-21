import style from '../../../assets/scss/watching/_suggestionBar.module.scss'
import {SuggestionVideo} from "./SuggestionVideo";
import CategoriesBar from "../../home/categories_bar/CategoriesBar";

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
                <div className={`${style.video__info}`}>
                    <span>Sample title</span>
                    <span>This is user name</span>
                    <span>Display like and views</span>
                </div>
            </div>
            <hr/>
            <div className={style.suggestion__main}>
                <CategoriesBar/>
                <SuggestionVideo/>
            </div>
        </div>
    )
}