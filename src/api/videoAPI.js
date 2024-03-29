import axios from "axios";
import { getStoredUserData } from "../services/accountService";
import { VTUBE_API } from "../app/constants";

export const VIDEO_API = `${VTUBE_API}/videos`;

export const findVideoList = async () => {
    let videoList = null;
    try {
        videoList = await axios.get(`${VIDEO_API}`);
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
};

export const findVideoSubscribedList = async (page) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.get(`${VIDEO_API}/subscribed`, {
      params: {
        page: page,
      },
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log(
      "Error when calling API to get list of subscribed videos: " + e
    );
  }
  return result;
};
