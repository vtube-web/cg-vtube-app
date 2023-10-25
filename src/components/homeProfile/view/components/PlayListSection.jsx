import React from 'react'

function PlayListSection() {
    const playList = useSelector(selectVideoList);
    const [playListArray, setPlayListArray] = useState([]);
    useEffect(() => {
      if (playList) {
        setPlayListArray(...playList);
      }
    }, [playList]);
    let video =
      "https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/shorts%2Fgirl4.mp4?alt=media&token=54fbb119-1481-48a7-b6bd-36aca2c5b568&_gl=1*groccl*_ga*MTE0NzY2MDExNy4xNjkxMDI4NDc2*_ga_CW55HF8NVT*MTY5NzcwMzkwNy4zNS4xLjE2OTc3MDU2NzUuNDkuMC4w";
    return (
      <div className={style.base__container}>
        <div className={style.new__video}>
          <div className={style.background__video}>
            <ReactPlayer
              className={style.small__video}
              url={video}
              controls={true}
              pip={true}
              stopOnUnmount={false}
              width="500px"
              height="250px"
              playing={true}
              onError={(e) => console.error("Video error:", e)}
            />
          </div>
          <div className={style.video__info}>
            <span className={style.info__title}>
              Title here:
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </span>
            <span className={style.info__view_date}>Views - Date here</span>
            <span className={style.info__description}>
              Description :
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </span>
          </div>
        </div>
        <div className={style.playlist__video}>
          <span>All playlists</span>
          <p>Playlist 1 title</p>
          <p>Playlist 2 title</p>
          <p>Playlist 3 title</p>
          <p>Playlist 4 title</p>
          <p>. . .</p>
          <span>Short</span>
        </div>
      </div>
    );
}

export default PlayListSection