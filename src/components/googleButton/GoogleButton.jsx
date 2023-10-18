
import { IoLogoGoogle } from "react-icons/io";

function GoogleButton() {

  return (
    <div className=" d-flex justify-content-center align-items-center mt-2 mb-0 ">
      <button className="btn btn-warning google-button d-flex flex-row align-items-center">
        <i>
          <IoLogoGoogle size={25} />
        </i>
        {/* <span className="google-button-text">SignUp/In</span> */}
      </button>
    </div>
  );
}

export default GoogleButton