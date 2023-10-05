import style from '../../assets/scss/Components/Watching/_commentSection.module.scss'
import {useEffect, useState} from "react";
import Comment from './Comment'

export default function CommentSection({commentList} = {}) {
    console.log(commentList);

    const [showButton, setShowButton] = useState(false);

    const handleInputChange = () => {
        setShowButton(!showButton);
    };
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
                    {commentList?.map((comment, index) => (
                        <div key={index}>
                            <Comment {...comment} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}