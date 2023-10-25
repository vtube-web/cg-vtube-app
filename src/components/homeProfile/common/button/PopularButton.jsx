
import "../../../../assets/css/homeProfile/VideoProfile.css";

function PopularButton({ active, onClick }) {
  return (
    <button
      className={`button-videoProfile${
        active ? "-active" : ""
      } me-3 mt-3 w-20 h-8 `}
      onClick={() => onClick("Popular")}
    >
      Phổ biến
    </button>
  );
}

export default PopularButton