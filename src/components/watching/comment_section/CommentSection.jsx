import style from '../../../assets/scss/watching/_commentSection.module.scss'
import {InputTextarea} from 'primereact/inputtextarea';
import {useEffect, useState} from "react";
import Comment from './Comment'
import {useDispatch, useSelector} from "react-redux";
import {selectVideoDetail} from "../../../features/video/videoSlice";
import {useNavigate, useParams} from "react-router-dom";
import {addComment} from "../../../features/comment_reply/commentSlice";
import {getStoredUserData} from "../../../services/accountService";

const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI4NDc2*_ga_CW55HF8NVT*MTY5NzEyNTg4NC4yOC4xLjE2OTcxMjU5MjAuMjQuMC4w';

export default function CommentSection() {
    const params = useParams();
    const video = useSelector(selectVideoDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const loggedUser = getStoredUserData();

    const commentData = {
        content: comment,
        videoId: params.videoId
    }


    useEffect(() => {
        if (video && video.commentDtoList && loggedUser) {
            const sortedComments = video.commentDtoList.slice().sort((a, b) => {
                if (a.userResponseDto.id === loggedUser.id && b.userResponseDto.id !== loggedUser.id) {
                    return -1;
                }
                if (a.userResponseDto.id !== loggedUser.id && b.userResponseDto.id === loggedUser.id) {
                    return 1;
                }
                return new Date(a.createAt) - new Date(b.createAt);
            });
            setCommentList(sortedComments)
        }
    }, [video])

    function handleInputChange(event) {
        setComment(event.target.value);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const newComment = {
            content: comment,
            videoId: params.videoId,
            likes: 0,
            dislikes: 0,
            createAt: Date.now(),
            replyDtoList: [],
            userResponseDto: {
                id: loggedUser.id,
                userName: loggedUser.userName,
                avatar: loggedUser.avatar || imgUrl
            }
        }
        const updatedCommentList = [newComment, ...commentList];
        dispatch(addComment(commentData));
        setCommentList(updatedCommentList);
        setComment("");
    }


    function handleCheckLogin() {
        if (loggedUser === null) {
            navigate("/login");
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
                            <InputTextarea
                                rows={2}
                                className={style.input__textarea}
                                value={comment}
                                placeholder={"Comment here..."}
                                onChange={(e) => setComment(e.target.value)}
                                onInput={handleInputChange}
                                onFocus={handleCheckLogin}
                                autoResize
                            />
                        </form>
                    </div>
                </div>

                {comment && (
                    <div className={style.comment__function}>
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