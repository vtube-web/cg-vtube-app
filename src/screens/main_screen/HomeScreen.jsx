import {Col, Container, Row} from "react-bootstrap";
import CategoriesBar from "../../components/home/categories_bar/CategoriesBar";
import Video from "../../components/home/video/Video";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {getVideos, selectVideoList, selectVideoListSuccess,} from "../../features/video/videoSlice";
import {useEffect, useState} from "react";

function HomeScreen() {
  const dispatch = useDispatch();
  const videoList = useSelector(selectVideoList);
  const success = useSelector(selectVideoListSuccess);
  const [reRender, setReRender] = useState(true);

  useEffect(() => {
    if (success || reRender) {
      dispatch(getVideos());
    }
  }, []);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Vtube - home</title>
            </Helmet>
            <Container>
                <div className={'p-4'}>
                    <CategoriesBar/>
                </div>
                <Row>
                    {Array.isArray(videoList) && videoList.length > 0 ? (
                        videoList.map((video) => (
                            <Col lg={3} md={4} key={video.id}>
                                <Video video={video}/>
                            </Col>
                        ))
                    ) : (
                        <p>No videos available</p>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default HomeScreen;
