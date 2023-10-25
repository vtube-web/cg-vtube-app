
import "../../../../assets/css/homeProfile/VideoProfile.css"

function NewestButton({ active, onClick }) {
  return (
    <button
      className={`button-videoProfile${
        active ? "-active" : ""
      } me-3 mt-3 w-20 h-8 `}
      
      onClick={() => onClick("Newest")}
    >
      Mới nhất
    </button>
  );
}

export default NewestButton;


