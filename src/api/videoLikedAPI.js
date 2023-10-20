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
    console.error(e);
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
    console.error(e);
  }
  return result;
};

export const createLikeOrDisLike = async (data) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios({
      method: "post",
      url: `${VIDEO_LIKED_API}`,
      headers: {
        Authorization: "Bearer " + user.accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        videoId: data.id,
        likedStatus: data.likeStatus,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return result;
};