import axios from "axios";
import { VTUBE_API } from "../app/constants";


export const submitReply = async(reply) => {
    let result = null;
    const token =
      JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";
    try {
        result = await axios.post(
          `${VTUBE_API}/${reply.commentId}/reply`,
          { content: reply.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        console.log("Submit reply error", e);
    }
    return result;
}

