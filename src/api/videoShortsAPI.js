import axios from "axios";

export const VIDEO_SHORTS_API = "http://localhost:8080/api/shorts";

export const findVideoShorts = async (page) => {
    let videoShortsList = null;
    try {
        videoShortsList = await axios.get(`${VIDEO_SHORTS_API}`, {
            params: {
                page: page,
            },
        });
    } catch (e) {
        console.log('getVideoShorts API error: ' + e);
    }
    return videoShortsList;
}