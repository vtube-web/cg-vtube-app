import axios from "axios";
import {getAccessToken} from "../services/accountService";

const VIDEO_UPLOAD_API = "http://localhost:8080/api/videos";
const token = getAccessToken() || "";

export const createVideo = async (video) => {
    let result = null;
    try {
        result = axios.post(
            `${VIDEO_UPLOAD_API}/add`,
            {title: video?.title, videoUrl: video?.videoUrl,duration:video?.duration},
            {headers: {Authorization: `Bearer ${token}`}}
        );
    } catch (e) {
        console.log("Create video error", e);
    }
    return result;
};

export const updateVideo = async (video) => {
  console.log(video);
  let result = null;
  try {
    result = axios.put(`${VIDEO_UPLOAD_API}/update`, video, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log("Update error", e);
  }
  return result;
};
