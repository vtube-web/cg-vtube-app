import axios from "axios";
export const VIDEO_SHORTS_API = "https://64c33808eb7fd5d6ebd09efe.mockapi.io/api/v1/videoShorts";

export const findVideoShorts = async () => {
    let videoShortsList = null;
    try {
        videoShortsList = await axios.get(`${VIDEO_SHORTS_API}`);
    } catch (e) {
        console.log('getVideoShorts API error: ' + e);

    }
    return videoShortsList;
}