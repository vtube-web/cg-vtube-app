import axios from "axios";

const token =
    JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";

export const submitReplyShorts = async(replyShorts) => {
    let result = null;
    try {
        result = await axios.post(
            `http://localhost:8080/api/${replyShorts.commentShortsId}/replyShorts`,
            {content: replyShorts.content},
            {headers: {Authorization: `Bearer ${token}`}}
        );
    } catch (e) {
        console.log("Submit reply error", e);
    }
    return result;
}

