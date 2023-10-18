import { useState } from "react";

import "../../../assets/css/homeProfile/VideoProfile.css";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import NewestButton from "../common/button/NewestButton"
import OldestButton from "../common/button/OldestButton"
import PopularButton from "../common/button/PopularButton"
import { BiSolidLike } from "react-icons/bi";
import RenderVideosHomeProfile from "../common/list/RenderVideosHomeProfile"

function Video() {
  const [activeButton, setActiveButton] = useState("Newest");
  const [homeProfileVideoList, setHomeProfileVideoList] = useState({});
  const [showNoVideoMessage, setShowNoVideoMessage] = useState(true);


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

    const filterVideos = () => {
      switch (activeButton) {
        case "Oldest":
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
        case "Popular":
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
        default:
          return homeProfileVideoList && homeProfileVideoList.length > 0
            ? RenderVideosHomeProfile(...homeProfileVideoList)
            : null;
      }
    };

  return (
    <div className="container ">
      {/* này là của button */}
      <div className="container d-flex video-profile-block-button p-0">
        {showNoVideoMessage ? (
          <>
            <NewestButton
              active={activeButton === "Newest"}
              onClick={handleButtonClick}
            />
            <OldestButton
              active={activeButton === "Oldest"}
              onClick={handleButtonClick}
            />
            <PopularButton
              active={activeButton === "Popular"}
              onClick={handleButtonClick}
            />
          </>
        ) : null}
      </div>
      {showNoVideoMessage ? (
        filterVideos()
      ) : (
        <div>
          <BiSolidLike size={100} />
          <h3>There are no videos in your channel yet</h3>
        </div>
      )}

      <div className="container w-100 h-100 mt-3">
        {/* Phần của 1 ô video bắt đầu từ đây */}
        <div className="row">
          {/* 1 ô video ở đây */}
          <div className="col-md-6 col-lg-3 mb-3 me-3 video-Profile">
            <div className="d-flex flex row">
              {/* này là cái ô ảnh */}
              <div className="img-videoProfile-background bg-dark p-1">
                <img className="img-videoProfile" />
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
                    <span className="playList-label">
                      Thêm vào danh sách chờ
                    </span>
                  </button>
                </div>
              </div>
              {/* này là name với nội dung */}
              <div className="d-flex flex-row  mt-2 p-0 content-videoProfile ">
                <div className="col-9 texttitle-videoProfile">
                  SỰ MẬP MỜ (COVER) - ĐỨC PHÚC | OFFICIAL
                </div>
                <div className="col-3 threedot-videoProfile">
                  <button>
                    <BsThreeDotsVertical size={20} />
                  </button>
                </div>
              </div>

              <div className="d-flex flex-row p-0 mt-1 view-time-size-videoProfile ">
                <div className="me-2">53 Tr Lượt xem</div>
                <div>• 4 Tháng trước </div>
              </div>
            </div>
          </div>
          {/* Kết thúc 1 ô Video */}
          
        </div>
      </div>
    </div>
  );
}

export default Video;
