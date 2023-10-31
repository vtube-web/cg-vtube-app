import axios from "axios";
import { getStoredUserData } from "../services/accountService";
import { VTUBE_API } from "../app/constants";

export const VIDEO_WATCHED_API = `${VTUBE_API}/watched-videos`;

export const videoWatchedList = async (page) => {
  let videoList = null;
  let user = getStoredUserData();
  try {
    videoList = await axios.get(`${VIDEO_WATCHED_API}`, {
      params: {
        page: page,
      },
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Error when calling API to get list of watched videos:", e);
  }

  return videoList;
};

export const deleteVideoWatched = async (videoId) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.delete(`${VIDEO_WATCHED_API}/${videoId}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log("Delete book API error: " + e);
  }
  return result;
};

export const deleteAllVideoWatched = async () => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.delete(`${VIDEO_WATCHED_API}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Error when deleting the list of watched videos:", e);
  }

  return result;
};
