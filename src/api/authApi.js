import axios from "axios";
import { VTUBE_API } from "../app/constants";

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