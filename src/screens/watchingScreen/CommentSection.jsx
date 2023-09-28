import style from '../../assets/scss/Components/Watching/_commentSection.module.scss'
import {useState} from "react";
import Comment from './Comment'
import data from '../../assets/commentsData.json'

export default function CommentSection() {
    const comments = data.comments.filter(comment => comment.parentCommentId === null);
    comments.forEach(comment => {
        comment.replies = data.comments.filter(reply => reply.parentCommentId === comment.id);
    });

    const [showButton, setShowButton] = useState(false);

    const handleInputChange = () => {
        setShowButton(!showButton);
    };
    return (
        <>
            <div className={style.comments__container}>
                <div className={style.comments__counter}>
                    {comments.length > 0 && <p>{comments.length} bình luận</p>}
                </div>
                <div className={style.comments__content}>
                    <div className={`${style.user__avatar} col-1`}>
                        <img
                            src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                            alt={"user avatar"}/>
                    </div>
                    <div className={`${style.content__input} col-11`}>
                        <form>
                            <input
                                type="text"
                                placeholder="Viết bình luận ..."
                                onClick={handleInputChange}
                            />
                        </form>
                    </div>
                </div>

                {showButton && (
                    <div className={style.comment__function}>
                        <button>Hủy</button>
                        <button>Bình luận</button>
                    </div>
                )}

                <div>
                    {comments.map((comment, index) => (
                        <div key={index}>
                            <Comment {...comment} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}