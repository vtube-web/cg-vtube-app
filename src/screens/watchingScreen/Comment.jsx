import React, {useState} from "react";
import {BiLike, BiDislike} from "react-icons/bi";

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
        <div id="comment">
            {Comment.length <= 0 ? (
                <h2>There is no comment yet ...</h2>
            ) : (
                <div id="body" className="row">
                    <div id="avatar_user" className="col-1">
                        <img src={avatar} alt={"user avatar"}></img>
                    </div>
                    <div id="main" className="col-11">
                        <div id="header" className="row">
                            <div className="col-1">
                                <a href="" className="author">
                                    {author}
                                </a>
                            </div>
                            <div className="col-11">
                                <span>{timeAgo}</span>
                            </div>
                        </div>
                        <div id="comment-content">
                            <p>{content}</p>
                        </div>
                        <div id="action-button">
                            <button>
                                <BiLike/>
                            </button>
                            &nbsp;
                            <button>
                                <BiDislike/>
                            </button>
                            &nbsp;
                            <button onClick={showInputReply}>Phản hồi</button>
                        </div>
                        <div>
                            {showInput && (
                                <div className="row">
                                    <div className="col-1">
                                        <img src={avatar}></img>
                                    </div>
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            placeholder="Viết bình luận ..."
                                            onClick={handleInputChange}
                                        ></input>
                                    </div>
                                </div>
                                // {showButton && (
                                //   <div className="div_button">
                                //     <button>Hủy</button>
                                //     &nbsp;
                                //     <button>Bình luận </button>
                                //   </div>
                                // )}
                            )}
                        </div>
                        <div>
                            {/* {replies.length > 0 && <p>Totals of comment: {replies.length}</p>} */}
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