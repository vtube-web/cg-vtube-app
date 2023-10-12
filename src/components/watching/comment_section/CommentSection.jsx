import style from '../../../assets/scss/watching/_commentSection.module.scss'
import {useEffect, useState} from "react";
import Comment from './Comment'
import {useDispatch, useSelector} from "react-redux";
import {selectVideoDetail} from "../../../features/video/videoSlice";
import {useParams} from "react-router-dom";
import {addComment} from "../../../features/comment_reply/commentSlice";
import {getStoredUserData} from "../../../services/accountService";

export default function CommentSection() {
    const params = useParams();
    const video = useSelector(selectVideoDetail);
    const [commentContent, setCommentContent] = useState("");
    const dispatch = useDispatch();
    const [commentList, setCommentList] = useState([]);
    const user = getStoredUserData();

    const commentData = {
        content: commentContent,
        videoId: params.videoId
    }
    const newComment = {
        content: commentContent,
        videoId: params.videoId,
        likes: 0,
        dislikes: 0,
        create_At: Date.now(),
        userResponseDto: {
            id: 1,
            userName: "Trung",
            avatar: "https://th.bing.com/th/id/R.71d14dec241efa2f8703e7db2f7d0071?rik=aaRrGql9XaBKqw&pid=ImgRaw&r=0"
        }
    }

    useEffect(() => {
        if (video) {
            setCommentList(video.commentDtoList)
        }
    }, [video])

    function handleInputChange(event) {
        setCommentContent(event.target.value);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const updatedCommentList = [newComment, ...commentList];
        dispatch(addComment(commentData));
        setCommentList(updatedCommentList);
        setCommentContent("");
    }

    let alertDisplayed = false;
    function handleCheckLogin() {
        console.log(user);
        if (user === undefined && !alertDisplayed) {
            alert("You must log in");
            alertDisplayed = true;
        }
    }

    return (
        <>
            <div className={style.comments__container}>
                <div className={style.comments__counter}>
                    {commentList?.length > 0 && <p>{commentList?.length} bình luận</p>}
                </div>
                <div className={style.comments__content}>
                    <div className={`${style.user__avatar} col-1`}>
                        <img
                            src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                            alt={"user avatar"}/>
                    </div>
                    <div className={`${style.content__input} col-11`}>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                name={"content"}
                                value={commentContent}
                                placeholder="Viết bình luận ..."
                                onInput={handleInputChange}
                                onFocus={handleCheckLogin}
                            />
                        </form>
                    </div>
                </div>

                {commentContent && (
                    <div className={style.comment__function}>
                        <button>Hủy</button>
                        <button onClick={handleComment}>Bình luận</button>
                    </div>
                )}

                <div>
                    {Array.isArray(commentList) && commentList.length > 0 ? (
                        commentList.map((comment, index) => (
                            <div key={index}>
                                <Comment {...comment} />
                            </div>
                        ))
                    ) : (
                        <div className={style.comment__no_content}>
                            <p>This video has no comments... Be the first one!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}