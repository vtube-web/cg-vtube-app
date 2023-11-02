import axios from "axios";
import { getAccessToken } from "../services/accountService";
import { VTUBE_API } from "../app/constants";

export const getComment = async (page) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.get(
      `${VTUBE_API}/comment?page=${
        page?.currentPageNumber == null ? 0 : page?.currentPageNumber
      }&content=${page?.content == null ? "" : page?.content}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log("get comment channel error", e);
  }
  return result;
};

export const editComment = async (comment) => {
  let result = null;
  try {
    result = await axios.put(`${VTUBE_API}/comment`, comment);
  } catch (e) {
    console.log("edit comment channel error", e);
  }
  return result;
};

export const deleteComment = async (id) => {
  let result = null;
  try {
    result = axios.delete(`${VTUBE_API}/comment/${id}`);
  } catch (e) {
    console.log("delete error", e);
  }
  return result;
};

export const createFeedback = async (feedback) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.post(
      `${VTUBE_API}/${feedback?.commentId}/reply`,
      feedback,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) {
    console.log("create feedback channel error", e);
  }
  return result;
};

export const editFeedback = async (feedback) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.put(`${VTUBE_API}/reply`, feedback, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log("create feedback channel error", e);
  }
  return result;
};

export const deleteFeedback = async (id) => {
  let result = null;
  try {
    result = await axios.delete(`${VTUBE_API}/reply/${id}`);
  } catch (e) {
    console.log("delete feedback error", e);
  }
  return result;
};

export const likeComment = async (id) => {
  let result = null;
  const token = getAccessToken();
    try {
      result = await axios.post(`${VTUBE_API}/vote/comment/up/${id}`,{}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log("like comment error", e);
    }
  return result;
};

export const dislikeComment = async (id) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.post(`${VTUBE_API}/vote/comment/down/${id}`,{} ,{
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log("dislike comment error", e);
  }
  return result;
};

export const likeFeedback = async (id) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.post(
      `${VTUBE_API}/vote/reply/up/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log("like reply error", e);
  }
  return result;
};

export const dislikeFeedback = async (id) => {
  let result = null;
  const token = getAccessToken();
  try {
    result = await axios.post(
      `${VTUBE_API}/vote/reply/down/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log("dislike reply error", e);
  }
  return result;
};
