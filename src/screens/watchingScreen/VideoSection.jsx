import style from '../../assets/scss/Components/Watching/_videoSection.module.scss'
import {
    BiSolidLike, BiLike,
    BiSolidDislike, BiDislike,
    BiSolidHelpCircle, BiHelpCircle,
    BiSolidMusic, BiMusic,
    BiSolidTrophy, BiTrophy
} from "react-icons/bi"
import {
    PiShareFatLight,
} from "react-icons/pi";
import ShowMore from 'react-show-more-text'
import "react-show-more-text/lib/ShowMoreText.css"
import sample from '../../assets/video/sample.mp4'

export default function VideoSection() {
    return (
        <>
            <div className={`${style.watching__video}`}>
                <div>
                    <video
                        src={sample}
                        className={`${style.video__main}`}
                        controls
                    />
                </div>
                <div className={style.video__title}>
                    Cloning Youtube
                </div>
                <div className={`${style.video__info__function}`}>
                    <div className={style.info__channel}>
                        <img className={style.channel__avatar}
                             src={"https://cdn.discordapp.com/attachments/1151490874195316856/1152992123059175694/b2c44a9549a5cf8c9eebb8eb8fc51213.jpg"}
                             alt={"user avatar"}/>
                        <div className={style.channel__info}>
                            <span className={style.channel__name}>
                                Trung Huynh
                            </span>
                            <span className={style.channel__subscribers}>
                                40m Subscribers
                            </span>
                        </div>
                        <div className={`${style.function__subscribe}`}>
                            Subscribe
                        </div>
                    </div>
                    <div className={style.function__channel}>
                        <span className={`${style.function__like}`}>
                            <BiLike size={20}/>
                            <span>44K</span>
                        </span>
                        <span className={`${style.function__dislike}`}>
                            <BiDislike size={20}/>
                        </span>
                        <span className={style.function__share}>
                            <PiShareFatLight size={20}/>
                            Share
                        </span>
                    </div>
                </div>
                <hr/>
                <div className={`${style.video__details}`}>
                    <div className={`${style.details__description}`}>
                        <div className={`${style.details__info}`}>
                            <span>{"10m views "}</span>
                            <span>{"1 year ago "}</span>
                            <span>{"#trunghuynh #coding #livecoding "}</span>
                        </div>
                        <ShowMore
                            lines={3}
                            more={"SHOW MORE"}
                            less={"SHOW LESS"}
                            anchorClass={style.showMore}
                            expanded={false}
                            keepNewLines={true}
                        >
                            {
                                "Lyrics\n" +
                                "\n" +
                                "you can open up to me\n" +
                                "show me what’s inside\n" +
                                "mother nature made us to intertwine \n" +
                                "\n" +
                                "lavender elixir so\n" +
                                "full of pheromones \n" +
                                "gimme one taste and you’re gone \n" +
                                "\n" +
                                "what if i can’t get you out of my thoughts\n" +
                                "what if my seasons don’t change\n" +
                                "what if you forget to forget me not\n" +
                                "and we fade away\n" +
                                "\n" +
                                "you’re my little flower\n" +
                                "blooming in the night\n" +
                                "only for an hour\n" +
                                "the northern lights\n" +
                                "\n" +
                                "my casablanca sweetheart\n" +
                                "nectar so divine\n" +
                                "baby you’re the best part\n" +
                                "of my life\n" +
                                "\n" +
                                "what can i do\n" +
                                "what can i say\n" +
                                "to convince you\n" +
                                "to stay \n" +
                                "\n" +
                                "all i see are tulips and\n" +
                                "i’m a hummingbird\n" +
                                "heavenly ambrosia in every curve\n" +
                                "\n" +
                                "honey dripping over my imagination\n" +
                                "the fragrance\n" +
                                "keeps flowing straight down to my soul\n" +
                                "\n" +
                                "what if i can’t get you out of my thoughts\n" +
                                "what if my seasons don’t change\n" +
                                "what if you love me then you love me not\n" +
                                "and we fade away\n" +
                                "\n" +
                                "you’re my little flower\n" +
                                "blooming in the night\n" +
                                "only for an hour\n" +
                                "the northern lights\n" +
                                "\n" +
                                "my casablanca sweetheart\n" +
                                "nectar so divine\n" +
                                "baby you’re the best part\n" +
                                "of my life\n" +
                                "\n" +
                                "what can i do\n" +
                                "what can i say\n" +
                                "to convince you\n" +
                                "to stay \n" +
                                "\n" +
                                "yeah\n" +
                                "oh\n" +
                                "yeah\n" +
                                "oh"
                            }
                        </ShowMore>
                    </div>
                </div>
            </div>
        </>
    )

}
