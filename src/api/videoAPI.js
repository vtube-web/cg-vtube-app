import axios from "axios";

export const VIDEO_API = "http://localhost:8080/api/videos";

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
        return  await axios.get(`${VIDEO_API}/${id}`)
    }catch(e){
        console.log('getVideo API error: '+ e);
    }
}
