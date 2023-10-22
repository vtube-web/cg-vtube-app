import style from "../../../../assets/scss/main_screen/shorts/_commentShorts.module.scss"
import React from "react";
import formatDateAgo from "../../../../format/FormatDateAgo";
import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import formatNumberView from "../../../../format/FormatNumberView";

function CommentShorts({commentShorts}) {
    return (
        <>
            <div className={style.comment__container}>
                {commentShorts.length <= 0 ? (
                    <h2>There is no comment yet ...</h2>
                ) : (
                    <div className={style.comment__body}>
                        <div className={style.body__container}>
                            <div className={style.comment__user}>

                                <div className={style.user__avatar}>
                                    <img
                                        src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                                        alt={'channel_name'}/>
                                </div>

                                <div className={style.info__container}>

                                    <div className={style.user__info}>
                                        <span className={style.user__name}>
                                        @{commentShorts.userResponseDto.userName}
                                        </span>
                                        <span
                                            className={style.comment__date}>
                                            {formatDateAgo(commentShorts.createAt)}
                                        </span>
                                    </div>

                                    <div className={style.comment__content}>
                                        {commentShorts.content}
                                    </div>

                                    <div className={style.comment__btn__container}>
                                        <div className={style.function__btn}>
                                            <div className={style.intrinsic__btn}>
                                                <BiSolidLike/>
                                            </div>
                                            <span>{formatNumberView(commentShorts.likes)}</span>

                                            <div className={style.intrinsic__btn}>
                                                <BiSolidDislike/>
                                            </div>
                                            <span>{formatNumberView(commentShorts.dislikes)}</span>


                                            <div className={style.reply__comment}>
                                                <span className={style.btn__reply}>Reply</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </>
    )
}

export default CommentShorts;