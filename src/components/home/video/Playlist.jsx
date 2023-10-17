import style from "./../../../assets/scss/main_screen/home/_playlist.module.scss"
import React from "react";

function Playlist() {
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.card__container}>
                    <img
                        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt="thumbnail"
                        className={style.card__thumbnail}/>
                    <div className={style.card__details}>
                        <span>Your Mixed Playlist</span>
                        <span>This user, that user, user and alot of other user</span>
                    </div>
                </div>
                <div className={style.back_card}/>
                <div className={style.third_card}/>
            </div>

        </div>
    )
}

export default Playlist;