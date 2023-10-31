import axios from "axios";
import { VTUBE_API } from "../app/constants";

const token =
    JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";
export const submitCommentShorts = async(commentShorts) => {
    let result = null;
    console.log(commentShorts);
    try {
        result = await axios.post(
          `${VTUBE_API}/${commentShorts.videoId}/commentShorts`,
          { content: commentShorts.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        console.log("Submit comment error", e);
    }
    return result;
}