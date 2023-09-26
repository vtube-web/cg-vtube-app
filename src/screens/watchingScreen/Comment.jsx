import React, {useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";
import style from '../../assets/scss/Components/Watching/_comment.module.scss'
import {Link} from "react-router-dom";

const Comment = ({author, avatar, content, timeAgo, replies}) => {
    const [showInput, setShowInput] = useState(false);

    const showInputReply = () => {
        setShowInput(!showInput);
    };

    const [showButton, setShowButton] = useState(false);

    const handleInputChange = () => {
        setShowButton(!showButton);
    };

    return (
        <div className={style.comment__container}>
            {Comment.length <= 0
                ? (<h2>There is no comment yet ...</h2>)
                : (
                    <div className={style.comment__body}>
                        <div className={`${style.user__avatar} col-1`}>
                            <img
                                src={avatar}
                                alt={"user avatar"}
                            />
                        </div>
                        <div className="col-11">
                            <div className={style.user__info}>
                                <Link to={"/"} className={style.user__name}>
                                    {author}
                                </Link>
                                <span className={style.comment__date}>
                                    {timeAgo}
                                </span>
                            </div>
                            <div className={style.comment__content}>
                                {content}
                            </div>
                            <div className={style.comment__function}>
                                <button><BiLike size={23}/></button>
                                <button><BiDislike size={23}/></button>
                                <button
                                    onClick={showInputReply}
                                    className={style.reply}
                                >
                                    Phản hồi
                                </button>
                            </div>
                            <div>
                                {showInput && (
                                    <div className={`${style.reply__container} row`}>
                                        <div className="col-1">
                                            <img
                                                src={avatar}
                                                alt={"user avatar"}
                                            />
                                        </div>
                                        <div className={`${style.reply__function} col-11`}>
                                            <input
                                                type="text"
                                                placeholder="Viết bình luận ..."
                                                className={style.comment__reply}
                                                onClick={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {replies &&
                                    replies.map((reply, index) => (
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