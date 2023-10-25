import axios from "axios";
import { getStoredUserData } from "../services/accountService";

export const VIDEO_HOMEPROFILE_API = "http://localhost:8080/api/homeProfile/videos";


export const videoHomeProfileList = async (data) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.get(`${VIDEO_HOMEPROFILE_API}`, {
      params: {
        userName: data.userName,
        type: data.type,
        page: data.page || 0,
      },
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log(
      "Error when calling API to get list of homeProfile videos:" + e
    );
  }
  return result;
};






