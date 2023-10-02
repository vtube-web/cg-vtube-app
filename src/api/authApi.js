import axios from "axios";

export const LOGIN_API = "http://localhost:8080/api/auth/login";


export const login = async (userCredential) => {
  let user = null;
  try {
    user = await axios.post(`${LOGIN_API}`, userCredential);
  } catch (e) {
    console.log("loginUser API error: " + e);
  }
  return user;
};
