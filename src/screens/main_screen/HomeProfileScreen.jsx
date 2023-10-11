import { useParams } from "react-router-dom";



function HomeProfileScreen() {
 const { userName } = useParams();
  return (

    <div>
      {`hello + ${userName}`}
    </div>
  );
}

export default HomeProfileScreen