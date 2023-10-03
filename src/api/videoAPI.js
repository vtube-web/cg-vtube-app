import axios from "axios";

export const VIDEO_API = "http://localhost:8081/api/videos";

export const findVideoList = async () => {
    let videoList = null;
    console.log("Dang lay Home list")
    try {
        videoList = await axios.get(`${VIDEO_API}`)
    } catch (e) {
        console.log('getVideoList API error: ' + e);
    }
    return videoList;
}

export const findVideo = async (id) => {
    let video = null;
    try{
        video = await axios.get(`${VIDEO_API}/{id}`)
    }catch(e){
        console.log('getVideo API error: '+ e);
    }
    return video;
}
