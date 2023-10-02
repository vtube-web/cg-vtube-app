import axios from "axios";

export const VIDEO_WATCHED_API =
  "https://651395f58e505cebc2e9f807.mockapi.io/api/v1/liked";

export const videoLikedList = async () => {
  let videoList = null;
  try {
    videoList = await axios.get(
      `${VIDEO_WATCHED_API}`
    );
  } catch (e) {
    console.log("get list video liked API error:" + e);
  }
  return videoList;
};