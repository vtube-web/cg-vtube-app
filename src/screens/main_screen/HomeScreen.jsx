import {Col, Container, Row} from "react-bootstrap";
import CategoriesBar from "../../components/home/categories_bar/CategoriesBar";
import Video from "../../components/home/video/Video";
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoListSuccess, selectVideoList} from "../../features/video/videoSlice";
import {useEffect, useState} from "react";

function HomeScreen() {
    const dispatch = useDispatch();
    const videoList = useSelector(selectVideoList);
    const success = useSelector(selectVideoListSuccess);
    useEffect(() => {
            if (!success) {
                dispatch(getVideos());
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
                        <Col lg={3} md={4} key={video.id}>
                            <Video video={video}/>
                        </Col>
                    ))}
            </Row>
        </Container>
    )
}

export default HomeScreen;