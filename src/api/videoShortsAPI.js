import axios from "axios";
import { VTUBE_API } from "../app/constants";

export const VIDEO_SHORTS_API = `${VTUBE_API}/shorts`;

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