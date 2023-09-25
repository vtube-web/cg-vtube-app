import homeScreen from "../screens/homeScreen/HomeScreen";
import MainLayout from "../layouts/mainLayout/MainLayout";
import libraryScreen from "../screens/libraryScreen/LibraryScreen";
import likedVideoScreen from "../screens/likedVideosScreen/LikedVideosScreen";
import loginScreen from "../screens/loginScreen/LoginScreen"
import subscribedScreen from "../screens/subscribedScreen/SubscribedScreen"
import watchedScreen from "../screens/watchedScreen/WatchedScreen"
import watchLaterScreen from "../screens/watchLaterScreen/WatchLaterScreen"
import yourVideoScreen from "../screens/yourVideoScreen/YourVideoScreen"
import watchingScreen from "../screens/watchingScreen/WatchingScreen"
import {notFoundScreen} from "../screens/notFoundScreen/NotFoundScreen";


export const publicRoutes = [
    {path:'/', component:homeScreen, layout: MainLayout},
    {path:'/library', component:libraryScreen, layout: MainLayout},
    {path:'/likedVideos', component:likedVideoScreen, layout: MainLayout},
    {path:'/login', component:loginScreen, layout: MainLayout},
    {path:'/subscribed', component:subscribedScreen, layout: MainLayout},
    {path:'/watchedVideos', component:watchedScreen, layout: MainLayout},
    {path:'/watchLater', component:watchLaterScreen, layout: MainLayout},
    {path:'/yourVideos', component:yourVideoScreen, layout: MainLayout},
    {path:'/watching', component:watchingScreen, layout: MainLayout},
    {path: '/*', component: notFoundScreen, layout: MainLayout}
]