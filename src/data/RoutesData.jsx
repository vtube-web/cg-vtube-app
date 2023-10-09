import homeScreen from "../screens/homeScreen/HomeScreen";
import MainLayout from "../layouts/mainLayout/MainLayout";
import libraryScreen from "../screens/libraryScreen/LibraryScreen";
import likedVideoScreen from "../screens/likedVideosScreen/LikedVideosScreen";
import SignInScreen from "../screens/signInScreen/SignInScreen";
import subscribedScreen from "../screens/subscribedScreen/SubscribedScreen";
import watchedScreen from "../screens/watchedScreen/WatchedScreen";
import watchLaterScreen from "../screens/watchLaterScreen/WatchLaterScreen";
import yourVideoScreen from "../screens/yourVideoScreen/YourVideoScreen";
import watchingScreen from "../screens/watchingScreen/WatchingScreen";
import notFoundScreen from "../screens/notFoundScreen/NotFoundScreen";
import shortsScreen from "../screens/shortsScreen/ShortsScreen";
import StudioLayout from "../layouts/studio_layout/StudioLayout";
import OverviewScreen from "../screens/studio_screen/OverviewScreen";
import ContentScreen from "../screens/studio_screen/ContentScreen";
import AnalyticalDataScreen from "../screens/studio_screen/AnalyticalDataScreen";
import CommentScreen from "../screens/studio_screen/CommentScreen";
import CustomizeChannelsScreen from "../screens/studio_screen/CustomizeChannelsScreen";
import LoginScreen from "../screens/login Screen/LoginScreen";
import RegisterScreen from "../screens/registerScreen/RegisterScreen";

export const publicRoutes = [
  { path: "/", component: homeScreen, layout: MainLayout },
  { path: "/library", component: libraryScreen, layout: MainLayout },
  { path: "/likedVideos", component: likedVideoScreen, layout: MainLayout },
  { path: "/signIn", component: SignInScreen, layout: MainLayout },
  { path: "/login", component: LoginScreen, layout: null },
  { path: "/register", component: RegisterScreen, layout: null },
  { path: "/subscribed", component: subscribedScreen, layout: MainLayout },
  { path: "/watchedVideos", component: watchedScreen, layout: MainLayout },
  { path: "/watchLater", component: watchLaterScreen, layout: MainLayout },
  { path: "/yourVideos", component: yourVideoScreen, layout: MainLayout },
  { path: `/watching/:videoId`, component: watchingScreen, layout: MainLayout },
  {
    path: `/channel/:channelId`,
    component: OverviewScreen,
    layout: StudioLayout,
  },
  {
    path: `/channel/:channelId/content/:subParam`,
    component: ContentScreen,
    layout: StudioLayout,
  },
  {
    path: `/channel/:channelId/analytical`,
    component: AnalyticalDataScreen,
    layout: StudioLayout,
  },
  {
    path: `/channel/:channelId/comment`,
    component: CommentScreen,
    layout: StudioLayout,
  },
  {
    path: `/channel/:channelId/customize`,
    component: CustomizeChannelsScreen,
    layout: StudioLayout,
  },
  { path: "/*", component: notFoundScreen, layout: null },
];

