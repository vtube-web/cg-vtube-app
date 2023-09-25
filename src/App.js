import './App.css';
import './assets/scss/_app.module.scss'
import HomeScreen from "./screens/homeScreen/HomeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import LibraryScreen from "./screens/libraryScreen/LibraryScreen";
import WatchedScreen from "./screens/watchedScreen/WatchedScreen";
import YourVideoScreen from "./screens/yourVideoScreen/YourVideoScreen";
import LikedVideosScreen from "./screens/likedVideosScreen/LikedVideosScreen";
import WatchingScreen from "./screens/watchingScreen/WatchingScreen";
import MainLayout from "./layouts/mainLayout/MainLayout";
import WatchLaterScreen from "./screens/watchLaterScreen/WatchLaterScreen";
import SubscribedScreen from "./screens/subscribedScreen/SubscribedScreen";
import {AppRoutes} from "./routes/AppRoutes";

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </>
    )
}

export default App;
