
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
    <div key={index} className="col-md-6 col-lg-3 mb-3 me-2 video-Profile">
      <Link to={`/watching/${video.id}`}>
        <div className="d-flex flex row">
          {/* này là cái ô ảnh */}
          <div className="img-videoProfile-background p-1 bg-dark">
            <img
              className="img-videoProfile"
              src={video.thumbnail}
              alt="Video Thumbnail"
            />
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

          <div className="row p-0 mt-2">
            <div className="col-11 ">
              <div className="texttitle-videoProfile ">
                {video.title}
              </div>
              <div className="d-flex flex-row p-0 mt-2 view-time-size-videoProfile mb-3">
                <div className="me-2">{formatNumberView(video.views)} lượt xem</div>
                <div>• {formatDateAgo(video.createAt)} </div>
              </div>
            </div>

            <div className="col-1 threedot-videoProfile">
              <button>
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>

    // kết thúc 1 ô video.
  );
}

export default ListVideosHomeProfile;
