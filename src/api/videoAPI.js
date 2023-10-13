import axios from "axios";
import { getStoredUserData } from "../services/accountService";

export const VIDEO_API = "http://localhost:8080/api/videos";

export const findVideoList = async () => {
    let videoList = null;
    console.log("Dang lay home list")
    try {
        videoList = await axios.get(`${VIDEO_API}`)
    } catch (e) {
        console.log('getVideoList API error: ' + e);
    }
    return videoList;
}

export const findVideo = async (id) => {
    let headers = {};
    const user = getStoredUserData();
     if (user && user.accessToken) {
       headers = {
         Authorization: `Bearer ${user.accessToken}`,
       };
     }

     try {
       return await axios.get(`${VIDEO_API}/${id}`, {
         headers,
       });
     } catch (error) {
       console.log("getVideo API error: ", error);
     }
}
