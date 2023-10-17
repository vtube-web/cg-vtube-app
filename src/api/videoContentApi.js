import axios from "axios";
import { getAccessToken } from "../service/accountService";

const VIDEO_UPLOAD_API = "http://localhost:8080/api/videos/content";
const token = getAccessToken() || "";

export const getChannelVideo = async (page) => {
  let result = null;
  try {
    result = axios.get(
      `${VIDEO_UPLOAD_API}?page=${page?.currentPageNumber || 0}&title=${
        page?.dataReq?.titles || ""
      }&status=${page?.dataReq?.displayMode || ""}&views=${
        page?.dataReq?.numberOfViews || ""
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log("Create video error", e);
  }
  return result;
};

export const editVideo = async (request) => {
  let result = null;
  try {
    result = axios.put(
      `${VIDEO_UPLOAD_API}/edit?param=${request?.param}`,
      { value: request?.value,idList : request?.idList },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) {
    console.log("Edit title error", e);
  }
  return result;
};

export const deleteVideo = async (idList) => {
  let result =null;
   try{
    result = axios.put(
      `${VIDEO_UPLOAD_API}/delete`,
      { idList:idList || [] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
   }catch (e) {
    console.log("Edit title error", e);
  }
  return result;
}