
import { useNavigate } from 'react-router-dom';
import  '../../assets/scss/Components/NotFound/NotFound.css'
import { CiSearch } from "react-icons/ci";

function NotFoundScreen() {
    const logoImg =
      "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png";

    const navigate = useNavigate(); 

    function handleClick() {
    navigate('/');
    }  
      
  return (
    <div id="error-page">
      <div id="error-page-content">
        <img
          className="error-image"
          src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
          alt="Error-Img"
        />
        <p className="text-error">Trang này không có sẵn. Mong bạn thông cảm</p>
        <p className="text-error">Bạn thử tìm cụm từ khác xem sao nhé</p>

        <div className="d-flex justify-content-center mt-3">
          <button onClick={handleClick}>
            <img src={logoImg} alt={"logo"} className="error-logo" />
          </button>
          <form className="d-flex" role="search" >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <CiSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotFoundScreen