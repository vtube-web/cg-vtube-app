import React, {useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";
import style from '../../../assets/scss/watching/_comment.module.scss';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addReply} from "../../../features/comment_reply/replySlice";
import {getStoredUserData} from "../../../services/accountService";
import formatDate from "../../../format/FormatDate";
import formatDateAgo from "../../../format/FormatDateAgo";

const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI8GW6-4mAT_V_E-GKjLSm1e-CZ6CG4PAG3eh5QDvLuhYxE';

const Reply = ({addReplyToComment, reply, commentId}) => {
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const currentUser = getStoredUserData() || {};

    const replyData = {
        commentId: commentId,
        content: replyContent
    };



    const showInputReply = () => {
        setReplyContent(`@${reply.userResponseDto.userName}`)
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setReplyContent(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const newReply = {
            commentId: commentId,
            content: replyContent,
            likes: 0,
            dislikes: 0,
            createAt: Date.now(),
            userResponseDto: {
                id: currentUser.id,
                userName: currentUser.email,
                avatar: currentUser.avatar || imgUrl
            }
        };
        dispatch(addReply(replyData));
        addReplyToComment(newReply);
        setReplyContent("");
        showInputReply();
    }

    return (
        <div className={style.comment__container}>
            {reply ? (
                <div className={style.comment__body}>
                    <div className={`${style.user__avatar} col-1`}>
                        <img
                            src={reply.userResponseDto.avatar || currentUser.avatar || imgUrl}
                            alt={"user avatar"}
                        />
                    </div>
                    <div className="col-11">
                        <div className={style.user__info}>
                            <Link to={"/"} className={style.user__name}>
                                {reply.userResponseDto.userName || currentUser.email}
                            </Link>
                            <span className={style.comment__date}>
                                {formatDateAgo(reply.createAt)}
                            </span>
                        </div>
                        <div className={style.comment__content}>
                            {reply.content || "No content available."}
                        </div>
                        <div className={style.comment__function}>
                            <span className={style.function__button}>
                                <BiLike size={23} className={style.button}/>
                                {reply.likes}
                            </span>
                            <span className={style.function__button}>
                                <BiDislike size={23} className={style.button}/>
                                {reply.dislikes}
                            </span>
                            <span onClick={showInputReply} className={style.reply}>
                                Reply
                            </span>
                        </div>
                        <div>
                            {showInput && (
                                <div className={`${style.reply__container} row`}>
                                    <div className={`col-1 ${style.container__img}`}>
                                        <img
                                            src={currentUser.avatar || imgUrl}
                                            alt={"user avatar"}
                                        />
                                    </div>
                                    <div className={`${style.reply__function} col-11`}>
                                        <form>
                                            <input
                                                type="text"
                                                placeholder="Write a reply..."
                                                name="content"
                                                value={replyContent}
                                                className={style.reply__content}
                                                onChange={handleInputChange}
                                                onSubmit={handleSubmit}
                                            />
                                            <div className={style.reply__button}>
                                                <button onClick={showInputReply} className={style.cancel}>
                                                    Cancel
                                                </button>
                                                <button className={style.submit} onClick={handleSubmit}>
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
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Reply;
