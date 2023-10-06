import axios from "axios";
import {VTUBE_API} from "../app/constants";

export const login = async (data) => {
  let user = {};
  console.log("at api")
  console.log(data)
  try {
    user = await axios.post(`${VTUBE_API}/auth/login`, data)
    return user
  } catch (e) {
    console.log("loginUser API error: " + e);
  }
  return user;
};
