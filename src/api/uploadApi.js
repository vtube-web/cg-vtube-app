import axios from "axios";

const VIDEO_UPLOAD_API = "http://localhost:8080/api/videos";
 const token =
   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaG9uZzEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTY0OTMxMjAsImV4cCI6MTY5NjUwMzkyMH0.8BC3qkxeAbAs2gbpZyTVu2praj426ku_aMiIwQdfQJjeyA1V6jMHNGqMF0X1AoFN_0hE8q2WC6Ait7mdlitwVQ";
         

export const createVideo = async (video) => {
  let result = null;
  try {
    result = axios.post(
      `${VIDEO_UPLOAD_API}/add`,
      { title: video.title, video_url: video.video_url },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) {
    console.log("Create video error", e);
  }
  return result;
};

export const updateVideo = async (video) =>{
  let result = null;
  try{
    result = axios.put(`${VIDEO_UPLOAD_API}/update`,video,{headers:{Authorization : `Bearer ${token}`}});
  }catch (e) {
    console.log("Update error",e);
  }
  return result;
}