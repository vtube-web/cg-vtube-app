import axios from "axios";

const token =
    JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";

export const submitReply = async(reply) => {
    let result = null;
    try {
        result = await axios.post(
            `http://localhost:8080/api/${reply.commentId}/reply`,
            {content: reply.content},
            {headers: {Authorization: `Bearer ${token}`}}
        );
    } catch (e) {
        console.log("Submit reply error", e);
    }
    return result;
}

