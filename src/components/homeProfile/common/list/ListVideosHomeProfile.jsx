
import "../../../../assets/css/homeProfile/VideoProfile.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";

import formatDateAgo from "../../../../format/FormatDateAgo";

import formatNumberView from "../../../../format/FormatNumberView";

function ListVideosHomeProfile({ index, ...video }) {
  return (
    // 1 ô video từ đây
    <Link to={`/watching/${video.videoId}`}>
      <div className="col-md-6 col-lg-3 mb-3 me-3 video-Profile">
        <div className="d-flex flex row">
          {/* này là cái ô ảnh */}
          <div className="img-videoProfile-background bg-dark p-1">
            <img className="img-videoProfile" src={video.thumbnail} alt="Video Thumbnail" />
            <div className="time-videoProfile">30:56</div>
            <div className="clock-videoProfile">
              <button>
                <AiOutlineClockCircle size={25} />
                <span className="clock-label">Xem sau</span>
              </button>
            </div>
            <div className="playList-videoProfile">
              <button>
                <MdPlaylistAdd size={25} />
                <span className="playList-label">Thêm vào danh sách chờ</span>
              </button>
            </div>
          </div>
          {/* này là name với nội dung */}
          <div className="d-flex flex-row  mt-2 p-0 content-videoProfile ">
            <div className="col-9 texttitle-videoProfile">
                {video.title}
              SỰ MẬP MỜ (COVER) - ĐỨC PHÚC | OFFICIAL
            </div>
            <div className="col-3 threedot-videoProfile">
              <button>
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>

          <div className="d-flex flex-row p-0 mt-1 view-time-size-videoProfile ">
            <div className="me-2">{formatNumberView(video.views)}Lượt xem</div>
            <div>• {formatDateAgo(video.createAt)}</div>
          </div>
        </div>
      </div>
    </Link>
    // kết thúc 1 ô video.
  );
}

export default ListVideosHomeProfile;
