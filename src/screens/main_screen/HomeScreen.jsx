import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/home/categories_bar/CategoriesBar";
import Video from "../../components/home/video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideos,
  selectVideoListSuccess,
  selectVideoList,
} from "../../features/video/videoSlice";
import { useEffect, useState } from "react";

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
    <Container>
      <div style={{ paddingBottom: "15px" }}>
        <CategoriesBar />
      </div>
      <Row>
        {Array.isArray(videoList) && videoList.length > 0 ? (
          videoList.map((video) => (
            <Col lg={3} md={4} key={video.id}>
              <Video video={video} />
            </Col>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </Row>
    </Container>
  );
}

export default HomeScreen;
