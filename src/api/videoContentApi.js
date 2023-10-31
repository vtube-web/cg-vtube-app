import axios from "axios";
import { getAccessToken } from "../services/accountService";
import { VTUBE_API } from "../app/constants";

const VIDEO_UPLOAD_API = `${VTUBE_API}/videos/content`;

export const getChannelVideo = async (page) => {
  let result = null;
  const token = getAccessToken() || "";
  try {
    result = axios.get(
      `${VIDEO_UPLOAD_API}?page=${page?.currentPageNumber || 0}&title=${
        page?.dataReq?.titles || ""
      }&status=${page?.dataReq?.displayMode || ""}&views=${
        page?.dataReq?.numberOfViews || ""
      }&isShort=${page?.isShort ? page?.isShort: false}`,
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
  const token = getAccessToken() || "";
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
  const token = getAccessToken() || "";
   try{
    result = axios.put(
      `${VIDEO_UPLOAD_API}/delete`,
      { idList:idList  },
      { headers: { Authorization: `Bearer ${token}` } }
    );
   }catch (e) {
    console.log("Edit title error", e);
  }
  return result;
}