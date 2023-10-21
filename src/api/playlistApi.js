import axios from "axios";
import {VTUBE_API} from "../app/constants";


export const getPlaylist = async (userId) => {
    let result = null;
    try {
        result = await axios.get(VTUBE_API + `/playlist/${userId}`);
    } catch (e) {
        console.log("get Playlist API error: " + e);
    }
    return result;
};

export const savePlaylist = async (playlistData) => {
    let result = null;
    try {
        result = await axios.post(VTUBE_API + `/playlist`, playlistData)
    } catch (e) {
        console.log("save Playlist API error: " + e);
    }
    return result;
}