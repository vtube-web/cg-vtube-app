
import "../../../../assets/css/homeProfile/VideoProfile.css";

function PopularButton({ active, onClick }) {
  return (
    <button
      className={active ? "" : ""}
      onClick={() => onClick("Popular")}
    >
      Phổ biến
    </button>
  );
}

export default PopularButton