import { AiOutlineClockCircle } from "react-icons/ai";

export default function WatchLaterScreen(){
    return (
      <div style={{marginTop:"20%"}}>
        <AiOutlineClockCircle size={100} style={{margin:"auto"}}/>
        <h3 style={{textAlign:"center"}}>There are no videos in this playlist yet</h3>
      </div>
    );
}