import style from '../../../../assets/scss/watching/_videoLine.module.scss'

export default function VideoLine() {
    return (
        <div className={style.container}>
            <div className={style.thumbnail__container}>
                <img
                    src={'https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/393935951_321543233817891_5424010994034663383_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=c2UUSLzvR-cAX_hnBJp&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfA1nrTPFG3GKFJijptuWrzINQJtGbpRvHmTtIi7_34Qdw&oe=6537D8AB'}
                    className={style.thumbnail}
                />
            </div>
            <div className={style.info__container}>
                <span
                    className={style.title}>RaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaRRaaaaaaaaaaaaaaaaaaaR</span>
                <span className={style.channel__name}> thisssssssssssssss isssssss myyyyyyyyyyyy nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            </div>
        </div>
    )
}