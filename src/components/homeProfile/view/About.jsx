
import { Link } from 'react-router-dom';
import '../../../assets/css/homeProfile/AboutProfile.css';
import { PiShareFatLight } from 'react-icons/pi';

function About() {

  return (
    <div className="container mt-5">
      <div className="row">
          <div className="col-9 ">
            <div className="d-flex flex-column ">
              <div className="description-homeProfile-section px-0">
                <div className="mb-4 description-homeProfile-title">
                  Description
                </div>
                <div>
                  <p className="description-homeProfile-text ">
                    Thái Dơm ! Debug để thêm bug. Kênh này là kênh cá nhân nhé.
                    Thằng nào vào đây ý kiến bố chém.
                    <br />
                    Channel này là nơi Thái Dev chia sẻ những kinh nghiệm, suy
                    nghĩ và kiến thức từ cơ bản đến nâng cao trong lập trình.
                    <br />
                    Cảm ơn mọi người đã đồng hành và ủng hộ mình.Sống tốt nhá,
                    ai FA thì sớm có người yêu nhá.
                    <br />
                    Xem thêm thông tin của mình tại: <br />
                    Dashboard: https://thaidev.com <br />
                    Facebook Page: https://www.facebook.com/ongdevvuitinh <br />
                    Discord: https://discord.gg/UAjbyrcZT5 <br />
                    Github: https://github.com/ThaiNguyen99. <br />
                  </p>
                </div>
              </div>

              <div className=" detail-user-homeProfile-section mt-3 px-0 mb-5">
                <div className="my-4 detail-homeProfile-title">Detail</div>
                <div className=" d-flex flex column detail-homeProfile-text mb-4">
                  <div className="me-5 "> For Bussiness Contact :</div>
                  <Link
                    to={"https://www.w3schools.com"}
                    className="detail-homeProfile-email"
                  >
                    thainguyengg12@gmail.com!
                  </Link>
                </div>
              </div>
              <div className='just-for-nothing'></div>

            </div>
          </div>

          <div className="col 3 ms-3 ">
            <div className="d-flex flex-column">
              <div className="mb-3 pb-3 px-0 text">Statistic</div>
              <div className="mb-3 pb-3 px-0 text">
                Created At : July 19, 2016
              </div>
              {/* <div className="mb-3 pb-3 px-0 text">
                Total views : 100.000.000
              </div> */}
              <div className="px-0">
                <button>
                  <PiShareFatLight size={25} />
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
  );

}

export default About