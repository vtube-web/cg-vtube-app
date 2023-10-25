import {useDispatch, useSelector} from "react-redux";
import {getVideoShorts, selectVideoShorts} from "../../features/shorts/shortsSlice";
import React, {useEffect, useState} from "react";
import Shorts from "../../components/home/shorts/Shorts";
import style from "../../assets/scss/main_screen/shorts/_shorts.module.scss";
import {ProgressSpinner} from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroll-component";
import {useNavigate} from "react-router-dom";

function ShortsScreen() {
    const dispatch = useDispatch();
    const videoShortsList = useSelector(selectVideoShorts);
    const [filteredShorts, setFilteredShorts] = useState([]);

    useEffect(() => {
        dispatch(getVideoShorts());
    }, []);

    useEffect(() => {
        if (videoShortsList && videoShortsList.content) {
            setFilteredShorts((prevList) => {
                if (Array.isArray(prevList)) {
                    return [...prevList, ...videoShortsList.content];
                } else {
                    return [...videoShortsList.content];
                }
            });
        }
        console.log(videoShortsList.currentPageNumber)
    }, [videoShortsList])


    const fetchMoreData = () => {
        setTimeout(async () => {
            if (videoShortsList && videoShortsList.hasNext) {
                await dispatch(getVideoShorts(videoShortsList.currentPageNumber + 1))
                    .then((response) => {
                        const newVideos = response.payload.data.content;
                        if (newVideos && newVideos.length > 0) {
                            const currentVideos = {...videoShortsList.content};
                            const newVideosReturn = currentVideos.concat(newVideos);
                            setFilteredShorts(newVideosReturn);
                        } else {
                            console.log("No new videos received.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching more data:", error);
                    });
            }
        }, 1500);
    };


    return (
        <div className={style.shorts__container}>
            <div className={style.shorts__content}>
                <InfiniteScroll
                    style={{
                        width: "100%",
                        overflow:"unset"
                    }}
                    dataLength={filteredShorts.length}
                    next={fetchMoreData}
                    hasMore={videoShortsList && videoShortsList.hasNext}
                    loader={
                        <ProgressSpinner style={{width: "50px", height: "50px", display:"block", margin:"auto"}}/>
                    }
                >
                    {filteredShorts
                        ? (filteredShorts.map((videoShort) => (
                                <Shorts
                                    key={videoShort.id}
                                    videoShort={videoShort}/>
                            ))
                        )
                        : (
                            <div>Loading...................</div>
                        )}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default ShortsScreen;