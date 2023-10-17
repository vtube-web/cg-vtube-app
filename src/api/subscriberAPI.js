import axios from "axios";
import { getStoredUserData } from "../services/accountService";

export const SUBSCRIBER_API = "http://localhost:8080/api/subscriber";

export const createSubscriber = async (channelId) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios({
      url: `${SUBSCRIBER_API}/${channelId}`,
      method: "post",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Error when calling API to add subscriber:", e);
  }

  return result;
};

export const deleteSubscribed = async (channelId) => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.delete(`${SUBSCRIBER_API}/${channelId}`, {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    });
  } catch (e) {
    console.log("Error when calling API to remove subscribed: " + e);
  }
  return result;
};
