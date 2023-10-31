import "./App.css";
import "./assets/scss/base/_app.module.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { getStoredUserData } from "./services/accountService";
import axios from "axios";
import { VTUBE_API } from "./app/constants";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const user = getStoredUserData();

    const timer = setTimeout(() => {
      const storeUser = getStoredUserData();
      if (storeUser != null) {
        setStatus(!status);
      }
    }, 10800000);

    if (user != null) {
      const userLoginTime = new Date(
        window.localStorage.getItem("userLoginTime")
      );
      setCurrentTime(new Date());
      const timeDifference = currentTime - userLoginTime;
      if (timeDifference >= 10800000 && timeDifference <= 604800000) {
        user.accessToken = user?.refreshToken;
        axios.get(`${VTUBE_API}/auth/refresh-token`).then((res) => {
          user.refreshToken = res?.data || "" || null;
          window.localStorage.setItem("user", JSON.stringify(user));
          window.localStorage.setItem("userLoginTime", currentTime);
        });
      }
    }
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
