import axios from "axios";
import { VTUBE_API } from "../app/constants";

const token =
    JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";

export const submitReplyShorts = async(replyShorts) => {
    let result = null;
    try {
        result = await axios.post(
          `${VTUBE_API}/${replyShorts.commentShortsId}/replyShorts`,
          { content: replyShorts.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        console.log("Submit reply error", e);
    }
    return result;
}

