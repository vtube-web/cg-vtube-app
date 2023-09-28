import style from "../../assets/scss/Components/Watching/_likedVideos.module.scss";
import {
  AiOutlineDownload,
  AiOutlineMore,
  AiFillCaretRight,
} from "react-icons/ai";
import { IoShuffleSharp } from "react-icons/io5";
export default function LikedVideosScreen() {
  return (
    <div className={`${style.main} container`}>
      <div className={`${style.playlist__liked} `}>
        <div className={`${style.content} `}>
          <div className={`${style.content__header} `}>
            <div className={`${style.content__thumbnail} `}>
              <div className={`${style.content__thumbnail__img} `}>
                <img
                  src="https://i.pinimg.com/564x/e5/55/1e/e5551e38ed6b63af9d5aed4090cb3e9d.jpg"
                ></img>
              </div>
              <div className={`${style.content__thumbnail__icon} `}></div>
            </div>
          </div>
          <div className={`${style.content__body} `}>
            <div className={`${style.content__text__header} `}>
              <p>Liked videos</p>
            </div>
            <div className={`${style.content__text__body} `}>
              <div className={`${style.content__text__username} `}>
                <p>Hai Nguyen</p>
              </div>
              <div className={`${style.content__text__data} `}>
                <p>243 videos</p>
              </div>
              <div className={`${style.content__button} `}>
                <button>
                  <AiOutlineDownload size={24} />
                </button>
                <button>
                  <AiOutlineMore size={24} />
                </button>
              </div>
            </div>
            <div className={`${style.playlist__button} `}>
              <button>
                <AiFillCaretRight size={30} />
                <span>Play all</span>
              </button>
              <button>
                <IoShuffleSharp size={30} />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
