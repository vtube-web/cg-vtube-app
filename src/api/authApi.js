import axios from "axios";
import { VTUBE_API } from "../app/constants";
import { getStoredUserData } from "../services/accountService";

export const login = async (userCredential) => {
  let user = null;
  try {
    user = await axios.post(VTUBE_API + "/auth/login", userCredential);
  } catch (e) {
    console.log("loginUser API error: " + e);
  }
  return user;
};

export const registerApi = async (data) => {
  let response = null;
  try {
    response = await axios.post(VTUBE_API + "/users/register", data);
  } catch (e) {
    console.log("Register error!");
    console.log(e);
  }
  return response;
};

export const checkEmailApi = async (data) => {
  let response = {};
  try {
    response = await axios.post(VTUBE_API + "/users/check_email", data);
    return response.data.status;
  } catch (e) {
    console.log("Check email error: ");
    return e.response;
  }
};

export const getInfo = async () => {
  let result = null;
  let user = getStoredUserData();
  try {
    result = await axios.get(VTUBE_API + "/users", {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    })
  } catch (e) {
    console.error('Error when fetching info user', e);
  }
  return result;
}

export const getUserList = async (data) => {
  let result = [];
  let user = getStoredUserData();
  try {
    result = await axios({
      url: `${VTUBE_API}/users/list-user`,
      method: "post",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      data: {
        userIdList:data,
      }
    });
  } catch (e) {
    console.error("Error when fetching list user by list userId", e);
  }
  return result;
};