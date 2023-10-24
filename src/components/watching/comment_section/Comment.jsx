import React, {useEffect, useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";
import style from '../../../assets/scss/watching/_comment.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addReply} from "../../../features/comment_reply/replySlice";
import Reply from "./Reply";
import {getStoredUserData} from "../../../services/accountService";
import formatDateAgo from "../../../format/FormatDateAgo";
import {InputTextarea} from "primereact/inputtextarea";

const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI8GW6-4mAT_V_E-GKjLSm1e-CZ6CG4PAG3eh5QDvLuhYxE';

const Comment = (comment) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [reply, setReply] = useState("");
    const [replyList, setReplyList] = useState([]);
    const currentUser = getStoredUserData();

    useEffect(() => {
        if (comment && comment.replyDtoList) {
            setReplyList(comment.replyDtoList);
        }
    }, [comment, comment.replyDtoList]);

    const replyData = {
        commentId: comment.id,
        content: reply
    };

    const addReplyToComment = (newReply) => {
        const updatedReplyList = [newReply, ...replyList];
        setReplyList(updatedReplyList);
    };

    const showInputReply = () => {
        setShowInput(!showInput);
    };
    const handleInputChange = (event) => {
        setReply(event.target.value);
    };
    function handleCheckLogin() {
        if (currentUser === null) {
            navigate("/signIn");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newReply = {
            commentId: comment.id,
            content: reply,
            likes: 0,
            dislikes: 0,
            createAt: Date.now(),
            userResponseDto: {
                id: currentUser.id,
                userName: currentUser.userName,
                avatar: currentUser.avatar || imgUrl
            }
        };
        const updatedReplyList = [newReply, ...replyList];
        dispatch(addReply(replyData));
        setReplyList(updatedReplyList);
        setReply("");
        showInputReply();
    }

    return (
        <div className={style.comment__container}>
            {comment.length <= 0 ? (
                <h2>There is no comment yet ...</h2>
            ) : (
                <div className={style.comment__body}>
                    <div className={`${style.user__avatar} col-1`}>
                        <img
                            src={comment.userResponseDto.avatar}
                            alt={"user avatar"}
                        />
                    </div>
                    <div className="col-11">

                        <div className={style.user__info}>
                            <Link to={"/"} className={style.user__name}>
                                {comment.userResponseDto.userName}
                            </Link>
                            <span className={style.comment__date}>
                                {formatDateAgo(comment.createAt)}
                            </span>
                        </div>

                        <div className={style.comment__content}>
                            {comment.content}
                        </div>

                        <div className={style.comment__function}>
                            <span className={style.function__button}>
                                <BiLike size={23} className={style.button}/>
                                {comment.likes}
                            </span>
                            <span className={style.function__button}>
                                <BiDislike size={23} className={style.button}/>
                                {comment.dislikes}
                            </span>
                            <span onClick={showInputReply} className={style.reply}>
                                Reply
                            </span>
                        </div>

                        <div>
                            {showInput && (
                                <div className={`${style.reply__container} row`}>
                                    <div className="col-1">
                                        <img
                                            src={currentUser.avatar || imgUrl}
                                            alt={"user avatar"}
                                        />
                                    </div>
                                    <div className={`${style.reply__function} col-11`}>
                                        <form>
                                            <InputTextarea
                                                rows={2}
                                                className={style.reply__content}
                                                value={reply}                                                placeholder={"Comment here..."}
                                                onChange={(e) => setReply(e.target.value)}
                                                onInput={handleInputChange}
                                                onFocus={handleCheckLogin}
                                                onSubmit={handleSubmit}
                                                autoResize
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
                        <div>
                            {replyList.map((reply, index) => (
                                <Reply key={index}
                                       addReplyToComment={addReplyToComment}
                                       reply={reply}
                                       commentId={comment.id}
                                       commentUsername={comment.userResponseDto.userName}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;