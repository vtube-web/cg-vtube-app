import style from "../../../../assets/scss/main_screen/shorts/_replyCommentShorts.module.scss"
import React, {useEffect, useState} from "react";
import formatDateAgo from "../../../../format/FormatDateAgo";
import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import formatNumberView from "../../../../format/FormatNumberView";
import {getStoredUserData} from "../../../../services/accountService";
import {addReplyShorts} from "../../../../features/comment_reply/replyShortsSlice";
import {useDispatch} from "react-redux";
import ReplyCommentShorts from "./ReplyCommentShorts";

function CommentShorts({commentShorts}) {

    const [replyShorts, setReplyShorts] = useState("");
    const [replyShortsList, setReplyShortsList] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const dispatch = useDispatch();
    const currentUser = getStoredUserData();
    const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI8GW6-4mAT_V_E-GKjLSm1e-CZ6CG4PAG3eh5QDvLuhYxE';

    useEffect(() => {
        if (commentShorts && commentShorts.replyDtoList) {
            setReplyShortsList(commentShorts.replyDtoList);
        }
    }, [commentShorts, commentShorts.replyDtoList]);

    const replyShortsData = {
        commentShortsId: commentShorts.id,
        content: replyShorts
    };

    const addReplyShortsToComment = (newReplyShorts) => {
        const updatedReplyShortsList = [newReplyShorts, ...replyShortsList];
        setReplyShortsList(updatedReplyShortsList);
    };

    const showInputReplyShorts = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setReplyShorts(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (replyShorts === "") {
            const newReplyShorts = {
                commentShortsId: commentShorts.id,
                content: "This field has no content and will be delete after",
                likes: 0,
                dislikes: 0,
                createAt: Date.now(),
                userResponseDto: {
                    id: currentUser.id,
                    userName: currentUser.userName,
                    avatar: currentUser.avatar || imgUrl
                }
            };
            const updatedReplyShortsList = [newReplyShorts, ...replyShortsList];
            setReplyShortsList(updatedReplyShortsList);
            setReplyShorts("");
            showInputReplyShorts();
        } else {
            const newReplyShorts = {
                commentShortsId: commentShorts.id,
                content: replyShorts,
                likes: 0,
                dislikes: 0,
                createAt: Date.now(),
                userResponseDto: {
                    id: currentUser.id,
                    userName: currentUser.userName,
                    avatar: currentUser.avatar || imgUrl
                }
            };
            const updatedReplyShortsList = [newReplyShorts, ...replyShortsList];
            dispatch(addReplyShorts(replyShortsData));
            setReplyShortsList(updatedReplyShortsList);
            setReplyShorts("");
            showInputReplyShorts();
        }
    }

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
                                        <div className={style.function__btn__container}>
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
                                                                    value={replyShorts}
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
                                            <div>
                                                {replyShortsList.map((replyShorts, index) => (
                                                    <ReplyCommentShorts
                                                        key={index}
                                                        addReplyToCommentShorts={addReplyShortsToComment}
                                                        replyShorts={replyShorts}
                                                        commentShortsId={commentShorts.id}
                                                        commentUsername={commentShorts.userResponseDto.userName}
                                                    />
                                                ))}
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