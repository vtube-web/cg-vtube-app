import React, {useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";
import style from '../../assets/scss/Components/Watching/_comment.module.scss'
import {Link} from "react-router-dom";

const Comment = (comment) => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const showInputReply = () => {
        setShowInput(!showInput);
    };
    const handleInputChange = () => {
        setShowButton(!showButton);
    };
    function handleSubmit() {

    }

    return (
        <div className={style.comment__container}>
            {Comment.length <= 0
                ? (<h2>There is no comment yet ...</h2>)
                : (
                    <div className={style.comment__body}>
                        <div className={`${style.user__avatar} col-1`}>
                            <img
                                src={comment.user.avatar}
                                alt={"user avatar"}
                            />
                        </div>
                        <div className="col-11">
                            <div className={style.user__info}>
                                <Link to={"/"} className={style.user__name}>
                                    {comment.user.username}
                                </Link>
                                <span className={style.comment__date}>
                                    {comment.timestamp}
                                </span>
                            </div>
                            <div className={style.comment__content}>
                                {comment.content}
                            </div>
                            <div className={style.comment__function}>
                                <span className={style.function__button}>
                                    <BiLike
                                        size={23}
                                        className={style.button}
                                    />{comment.likes}
                                </span>
                                <span className={style.function__button}>
                                    <BiDislike
                                        size={23}
                                        className={style.button}
                                    />{comment.dislike}
                                </span>

                                <span
                                    onClick={showInputReply}
                                    className={style.reply}
                                >
                                    Phản hồi
                                </span>
                            </div>
                            <div>
                                {showInput && (
                                    <div className={`${style.reply__container} row`}>
                                        <div className="col-1">
                                            <img
                                                src={comment.user.avatar}
                                                alt={"user avatar"}
                                            />
                                        </div>
                                        <div className={`${style.reply__function} col-11`}>
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    placeholder="Viết bình luận ..."
                                                    className={style.comment__reply}
                                                    onClick={handleInputChange}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {comment.replies &&
                                    comment.replies.map((reply, index) => (
                                        <Comment key={index} {...reply} />
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Comment;