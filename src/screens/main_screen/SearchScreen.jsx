import {useSelector} from "react-redux";
import {selectSearchData} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";
import Video from "../../components/home/video/Video";
import {Col, Container, Row} from "react-bootstrap";

export default function SearchScreen() {
    const searchData = useSelector(selectSearchData);
    console.log(searchData.data.content);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(searchData.data.content);
    }, [searchData])
    return (
        <Container>
            <Row>
                {Array.isArray(videos) && videos.length > 0 ? (
                    videos.map((video) => (
                        <Col lg={3} md={4} key={video.id}>
                            <Video video={video}/>
                        </Col>
                    ))
                ) : (
                    <div className={'d-flex justify-content-center pt-5'}>No videos available</div>
                )}
            </Row>
        </Container>
    )
}