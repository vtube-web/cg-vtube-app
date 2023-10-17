

function NewestButton({ active, onClick }) {

 return (
   <button
     className={active ? "" : ""}
     onClick={() => onClick("NEWEST")}
   >
     Newest
   </button>
 );
}

export default NewestButton;