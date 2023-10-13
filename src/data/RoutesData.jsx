import homeScreen from "../screens/main_screen/HomeScreen";
import MainLayout from "../layouts/main_layout/MainLayout";
import libraryScreen from "../screens/main_screen/LibraryScreen";
import likedVideoScreen from "../screens/main_screen/LikedVideosScreen";
import SignInScreen from "../screens/auth_screen/SignInScreen";
import subscribedScreen from "../screens/main_screen/SubscribedScreen";
import watchedScreen from "../screens/main_screen/WatchedScreen";
import watchLaterScreen from "../screens/main_screen/WatchLaterScreen";
import yourVideoScreen from "../screens/main_screen/YourVideoScreen";
import watchingScreen from "../screens/watching_screen/WatchingScreen";
import notFoundScreen from "../screens/404_screen/NotFoundScreen";
import shortsScreen from "../screens/main_screen/ShortsScreen";
import StudioLayout from "../layouts/studio_layout/StudioLayout";
import OverviewScreen from "../screens/studio_screen/OverviewScreen";
import ContentScreen from "../screens/studio_screen/ContentScreen";
import AnalyticalDataScreen from "../screens/studio_screen/AnalyticalDataScreen";
import CommentScreen from "../screens/studio_screen/CommentScreen";
import CustomizeChannelsScreen from "../screens/studio_screen/CustomizeChannelsScreen";
import LoginScreen from "../screens/auth_screen/LoginScreen";
import RegisterScreen from "../screens/auth_screen/RegisterScreen";
import mainLayout from "../layouts/main_layout/MainLayout";
import HomeProfileScreen from "../screens/main_screen/HomeProfileScreen";


export const publicRoutes = [
    {path: "/", component: homeScreen, layout: MainLayout},
    {path: "/library", component: libraryScreen, layout: MainLayout},
    {path: "/likedVideos", component: likedVideoScreen, layout: MainLayout},
    {path: "/signIn", component: SignInScreen, layout: MainLayout},
    {path: "/login", component: LoginScreen, layout: null},
    {path: "/register", component: RegisterScreen, layout: null},
    {path: "/shorts", component: shortsScreen, layout: mainLayout},
    {path: "/subscribed", component: subscribedScreen, layout: MainLayout},
    {path: "/watchedVideos", component: watchedScreen, layout: MainLayout},
    {path: "/watchLater", component: watchLaterScreen, layout: MainLayout},
    {path: "/yourVideos", component: yourVideoScreen, layout: MainLayout},
    {path: `/watching/:videoId`, component: watchingScreen, layout: MainLayout},
    {path: `/channel/:channelId`, component: OverviewScreen, layout: StudioLayout,},
    {path: `/channel/:channelId/content/:subParam`, component: ContentScreen, layout: StudioLayout,},
    {path: `/channel/:channelId/analytical`, component: AnalyticalDataScreen, layout: StudioLayout,},
    {path: `/channel/:channelId/comment`, component: CommentScreen, layout: StudioLayout,},
    {path: `/channel/:channelId/customize`, component: CustomizeChannelsScreen, layout: StudioLayout,},
    {path: `/homeProfile/:userName/:subParam`, component: HomeProfileScreen, layout:MainLayout},
    {path: "/*", component: notFoundScreen, layout: null},
];

