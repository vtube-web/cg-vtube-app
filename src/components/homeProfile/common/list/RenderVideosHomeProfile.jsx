
import "../../../../assets/css/homeProfile/VideoProfile.css";
import ListVideosHomeProfile from "./ListVideosHomeProfile"

function RenderVideosHomeProfile(...homeProfileVideoList) {
  const videos = homeProfileVideoList;
  if (videos.length === 0) {
    return (
      <div>
        <p>No videos found.</p>
      </div>
    );
  } else {
    return (
      <div className="container w-100 h-100 mt-3">
        {/* Phần của 1 ô video bắt đầu từ đây */}
        <div className="row">
          {videos.map((video, index) => (
            <ListVideosHomeProfile key={index} index={index} {...video} />
          ))}
        </div>
      </div>
    );
  }
}

export default RenderVideosHomeProfile