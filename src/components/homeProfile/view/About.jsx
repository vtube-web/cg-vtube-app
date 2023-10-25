
import { Link } from 'react-router-dom';
import '../../../assets/css/homeProfile/AboutProfile.css';
import { PiShareFatLight } from 'react-icons/pi';
import formatDate from '../../../format/FormatDate';

function About(props) {

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
                    {props.description}
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
                    {props.email}
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
                Created At :
                {formatDate(props.createdAt)}
              </div>
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