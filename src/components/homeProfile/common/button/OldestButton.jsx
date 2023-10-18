
import "../../../../assets/css/homeProfile/VideoProfile.css";

function OldestButton({ active, onClick }) {
  return (
    <button
      className={active ? "" : ""}
      onClick={() => onClick("Oldest")}
    >
      Cũ nhất
    </button>
  );
}

export default OldestButton