
import "../../../../assets/css/homeProfile/VideoProfile.css";

function OldestButton({ active, onClick }) {
  return (
    <button
      className={`button-videoProfile${
        active ? "-active" : ""
      } me-3 mt-3 w-20 h-8 `}
      onClick={() => onClick("Oldest")}
    >
      Cũ nhất
    </button>
  );
}

export default OldestButton