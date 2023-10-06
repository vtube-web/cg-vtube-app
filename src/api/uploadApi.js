import axios from "axios";

const VIDEO_UPLOAD_API = "http://localhost:8080/api/videos";
 const token = JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";

  console.log(token)

export const createVideo = async (video) => {
  let result = null;
  try {
    result = axios.post(
      `${VIDEO_UPLOAD_API}/add`,
      { title: video.title, videoUrl: video.videoUrl },
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