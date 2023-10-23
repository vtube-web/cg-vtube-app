
import '../../../assets/css/homeProfile/ChannelProfile.css';

function Channel() {
  return (
    <div className="container">
      <div className="d-flex flex-column mt-4">
        <div className="channelHomeProfile-title">Subscribed channels</div>

        <div className="row my-4 ">
          {/* Lặp các avatar ở đây */}
          {/* Bắt đầu 1 ô */}
          <div className="col-2 mb-3">
            <div className="d-flex mb-3 flex-column align-items-center">
              <img
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/98438484/original/b6d75e78a1805b5f44e2326556787bdae730c6ba/custom-made-youtube-avatar.jpg"
                className="img-fluid rounded-circle avatar-channelHomeProfile"
              />

              <div className='mt-1 name-text'>
                Thái OCD Vlogs
              </div>

              <div className='mt-1 subcribe-text'>
                330 người đăng ký 
              </div>
            </div>
          </div>
          {/* Kết thúc 1 ô */}
          

        </div>
      </div>
    </div>
  );
}

export default Channel