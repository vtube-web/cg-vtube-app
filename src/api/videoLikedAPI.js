import axios from "axios";
import { getStoredUserData } from "../services/accountService";

export const VIDEO_LIKED_API = "http://localhost:8080/api/liked-videos";

export const videoLikedList = async () => {
  let result = null;
    let user = getStoredUserData();
  try {
    result = await axios.get(`${VIDEO_LIKED_API}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Error when calling API to get list of liked videos:" + e);
  }
  return result;
};

export const deleteVideoLiked = async (videoId) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.delete(`${VIDEO_LIKED_API}/${videoId}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Delete book API error: " + e);
  }
  return result;
};