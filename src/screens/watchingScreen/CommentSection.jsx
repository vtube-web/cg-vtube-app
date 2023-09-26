import style from'../../assets/scss/Components/Watching/_commentSection.module.scss'
import {useState} from "react";
import Comment from './Comment'

export default function CommentSection() {

    const [showButton, setShowButton] = useState(false);

    const handleInputChange = () => {
        setShowButton(!showButton);
    };
    // const commentsData = []
    const commentsData = [
        {
            author: "Alice",
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU",
            content: "This is the first comment.",
            timeAgo: "1 ngày trước",
            replies: [
                {
                    author: "Adam",
                    avatar:
                        "https://marketplace.canva.com/EAFauoQSZtY/1/0/1600w/canva-brown-mascot-lion-free-logo-qJptouniZ0A.jpg",
                    content: "Reply to Alice",
                    timeAgo: "2 giờ trước",
                    replies: [
                        {
                            author: "Jone",
                            avatar:
                                "https://banner2.cleanpng.com/20190311/rcg/kisspng-ho-chi-minh-city-ho-chi-minh-communist-youth-union-gii-thiu-chung-v-on-thanh-nin-tr-5c860a1b9fdf17.6338236315522882836548.jpg",
                            content: "Reply to Adam",
                            timeAgo: "1 giờ trước",
                            replies:[]
                        },
                    ],
                },
                {
                    author: "Jone",
                    avatar:
                        "https://banner2.cleanpng.com/20190311/rcg/kisspng-ho-chi-minh-city-ho-chi-minh-communist-youth-union-gii-thiu-chung-v-on-thanh-nin-tr-5c860a1b9fdf17.6338236315522882836548.jpg",
                    content: "Reply to Alice",
                    timeAgo: "1 giờ trước",
                    replies:[]
                },
            ],
        },
        {
            author: "Henry",
            avatar:
                "https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG",
            content: "This is another comment.",
            timeAgo: "2 ngày trước",
            replies: [
                {
                    author: "Jack",
                    avatar:
                        "https://media.vov.vn/sites/default/files/styles/large/public/2021-11/2021-mercedes-star-in-ring-100th-anniversary-10.jpg",
                    content: "Reply to Henry",
                    timeAgo: "2 giờ trước",
                    replies:[]
                },
                {
                    author: "Kevin",
                    avatar:
                        "https://i.graphicmama.com/blog/wp-content/uploads/2020/10/30131032/P-amazing-3D-logo-design-concept-in-20211.jpg",
                    content: "Reply to Henry",
                    timeAgo: "1 giờ trước",
                    replies:[]
                },
            ],
        },
    ];

    return (
        <>
            <div className={style.comments__container}>
                <div className={style.comments__counter}>
                    {commentsData.length > 0 && <p>{commentsData.length} bình luận</p>}
                </div>

                <div className={style.comments__content}>
                    <div className={`${style.user__avatar} col-1`}>
                        <img
                            src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                            alt={"user avatar"}/>
                    </div>
                    <div className={`${style.content__input} col-11`}>
                        <input
                            type="text"
                            placeholder="Viết bình luận ..."
                            onClick={handleInputChange}
                        />
                    </div>
                </div>
                {showButton && (
                    <div className={style.comment__function}>
                        <button>Hủy</button>
                        &nbsp;
                        <button>Bình luận</button>
                    </div>
                )}

                <div>
                    {commentsData.map((comment, index) => (
                        <Comment key={index} {...comment} />
                    ))}
                </div>
            </div>
        </>
    );
}