import { useState } from "react";

import "../../../assets/css/homeProfile/VideoProfile.css";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

function Video() {

  const [activeButton, setActiveButton] = useState("Newest");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="container ">

      {/* này là của button */}
      <div className="container d-flex video-profile-block-button p-0">
        <button className="button-videoProfile-active me-3 mt-3 w-20 h-8">
          Mới nhất
        </button>
        <button className="button-videoProfile me-3 mt-3 w-20 h-8">
          Phổ biến
        </button>
        <button className="button-videoProfile me-3 mt-3 w-20 h-8">
          Cũ nhất
        </button>
      </div>

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
                    <span className="playList-label">Thêm vào danh sách chờ</span>
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
