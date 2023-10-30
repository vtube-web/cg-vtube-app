import style from "../../../../assets/scss/main_screen/shorts/_replyCommentShorts.module.scss";
import formatDateAgo from "../../../../format/FormatDateAgo";
import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import formatNumberView from "../../../../format/FormatNumberView";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getStoredUserData} from "../../../../services/accountService";
import {addReply} from "../../../../features/comment_reply/replySlice";


function ReplyCommentShorts({addReplyToCommentShorts, replyShorts, commentShortsId}) {
    const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI8GW6-4mAT_V_E-GKjLSm1e-CZ6CG4PAG3eh5QDvLuhYxE';
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [replyShortsContent, setReplyShortsContent] = useState("");
    const currentUser = getStoredUserData() || {};

    const replyShortsData = {
        commentShortsId: commentShortsId,
        content: replyShortsContent
    };


    const showInputReplyShorts = () => {
        setReplyShortsContent(`@${replyShorts.userResponseDto.userName}`)
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setReplyShortsContent(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const newReply = {
            commentShortsId: commentShortsId,
            content: replyShortsContent,
            likes: 0,
            dislikes: 0,
            createAt: Date.now(),
            userResponseDto: {
                id: currentUser.id,
                userName: currentUser.userName,
                avatar: currentUser.avatar || imgUrl
            }
        };
        dispatch(addReply(replyShortsData));
        addReplyToCommentShorts(newReply);
        setReplyShortsContent("");
        showInputReplyShorts();
    }

    return (
        <>
            <div className={style.comment__container}>
                {replyShorts ? (
                    <div className={style.comment__body}>
                        <div className={style.body__container}>
                            <div className={style.comment__user}>

                                <div className={style.user__avatar}>
                                    <img
                                        src={replyShorts.userResponseDto.avatar || currentUser.avatar || imgUrl}
                                        alt={"user avatar"}
                                    />
                                </div>

                                <div className={style.info__container}>

                                    <div className={style.user__info}>
                                        <span className={style.user__name}>
                                        @{replyShorts.userResponseDto.userName}
                                        </span>
                                        <span
                                            className={style.comment__date}>
                                            {formatDateAgo(replyShorts.createAt)}
                                        </span>
                                    </div>

                                    <div className={style.comment__content}>
                                        {replyShorts.content}
                                    </div>

                                    <div className={style.comment__btn__container}>
                                        <div className={style.function__btn__container}>
                                            <div className={style.function__btn}>
                                                <div className={style.intrinsic__btn}>
                                                    <BiSolidLike/>
                                                </div>
                                                <span>{formatNumberView(replyShorts.likes)}</span>

                                                <div className={style.intrinsic__btn}>
                                                    <BiSolidDislike/>
                                                </div>
                                                <span>{formatNumberView(replyShorts.dislikes)}</span>


                                                <div className={style.reply__comment}>
                                                <span
                                                    onClick={showInputReplyShorts}
                                                    className={style.btn__reply}>Reply
                                                </span>
                                                </div>
                                            </div>

                                            <div>
                                                {showInput && (
                                                    <div className={style.reply__container}>
                                                        <img
                                                            src={currentUser.avatar || imgUrl}
                                                            alt={"user avatar"}
                                                        />
                                                        <div className={style.reply__function}>
                                                            <form>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Write a reply..."
                                                                    name="content"
                                                                    value={replyShortsContent}
                                                                    onChange={handleInputChange}
                                                                    onSubmit={handleSubmit}
                                                                    className={style.reply__content}
                                                                />
                                                                <div className={style.function__btn_reply}>
                                                                    <button
                                                                        onClick={showInputReplyShorts}>
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        onClick={handleSubmit}>
                                                                        Reply
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default ReplyCommentShorts;