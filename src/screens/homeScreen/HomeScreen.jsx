import {Col, Container, Row} from "react-bootstrap";
import CategoriesBar from "../../components/home/CategoriesBar/CategoriesBar";
import Video from "../../components/home/Video/Video";
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoListSuccess, selectVideoList} from "../../features/video/videoSlice";
import {useEffect, useState} from "react";
import {getStoredUserData} from "../../service/accountService";

function HomeScreen() {
    const dispatch = useDispatch();
    const videoList = useSelector(selectVideoList);
    const success = useSelector(selectVideoListSuccess);
    console.log("Re-render HomeScreen")
    useEffect(() => {
            if (!success) {
                dispatch(getVideos());
                console.log("Getting videos...");
            }
    }, [])

    return (
        <Container>
            <div style={{paddingBottom: "15px"}}>
                <CategoriesBar/>
            </div>
            <Row>
                {videoList.map(
                    (video) => (
                        <Col lg={3} md={4}>
                            <Video key={video.id} video={video}/>
                        </Col>
                    ))}
            </Row>
        </Container>
    )
}

export default HomeScreen;