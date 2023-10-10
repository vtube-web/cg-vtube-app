import React, {useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";
import style from '../../../assets/scss/Components/Watching/_comment.module.scss'
import {Link} from "react-router-dom";
const imgUrl ='https://cdn.discordapp.com/attachments/1151490874195316856/1152992123059175694/b2c44a9549a5cf8c9eebb8eb8fc51213.jpg?ex=65144c97&is=6512fb17&hm=7cca2b7ecd47ea4a8350668162dc73dcf9afe9952c7776d480ad07f9dbb55ae0&';

const loggedUser = [
    {
        id:1,
        username: 'Trung',
        avatar: imgUrl,
    }
];

const Comment = (comment) => {
    const [showInput, setShowInput] = useState(false);
    const [comments, setComments] = useState({})
    const [reply, setReply] = useState("");

    const showInputReply = () => {
        setShowInput(!showInput);
    };
    const handleInputChange = (event) => {
        setReply(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (reply.trim() === "") {
            return;
        }
        const newReply = {
            id: 8,
            user: loggedUser[0],
            video_id: 1,
            timestamp: new Date().toISOString(),
            likes: 0,
            dislike: 0,
            content: reply,
            parentCommentId: comment.id
        };
        const updatedComments = [...comments];
        updatedComments.push(newReply);
        setReply("");
        setComments(updatedComments);
    };


    return (
        <div className={style.comment__container}>
            {Comment.length <= 0
                ? (<h2>There is no comment yet ...</h2>)
                : (
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
                                    {comment.createAt}
                                </span>
                            </div>
                            <div className={style.comment__content}>
                                {comment.content}
                            </div>
                            <div className={style.comment__function}>
                                <span className={style.function__button}>
                                    <BiLike size={23} className={style.button}/>
                                    {comment.like}
                                </span>
                                <span className={style.function__button}>
                                    <BiDislike size={23} className={style.button}/>
                                    {comment.dislike}
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
                                                src={loggedUser.avatar}
                                                alt={"user avatar"}
                                            />
                                            <span>{loggedUser.username}</span>
                                        </div>
                                        <div className={`${style.reply__function} col-11`}>
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    placeholder="Write a reply..."
                                                    name="content"
                                                    value={reply}
                                                    className={style.reply__content}
                                                    onChange={handleInputChange}
                                                />
                                                <div className={style.reply__button}>
                                                    <button onClick={showInputReply} className={style.cancel}>
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className={style.submit}>
                                                        Reply
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {comment.replyDtoList && comment.replyDtoList.map((reply, index) => (
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