
import "../../../../assets/css/homeProfile/VideoProfile.css"

function NewestButton({ active, onClick }) {

 return (
   <button
     className={active ? "" : ""}
     onClick={() => onClick("NEWEST")}
   >
     Mới nhất
   </button>
 );
}

export default NewestButton;