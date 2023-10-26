import axios from "axios";


export const submitComment = async (comment) => {
  let result = null;
  const token =
      JSON.parse(window.localStorage.getItem("user"))?.accessToken || "";
  try {
    result = await axios.post(
      `http://localhost:8080/api/${comment.videoId}/comment`,
      { content: comment.content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) {
    console.log("Submit comment error", e);
  }
  return result;
};

