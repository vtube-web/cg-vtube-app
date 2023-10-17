import style from "../../../assets/scss/layout/_sidebar.module.scss";
import "../../../assets/scss/base/_misc.scss";
import { IoGameControllerOutline } from "react-icons/io5";

import { HiOutlineNewspaper } from "react-icons/hi2";

import {
  BsCollectionPlay,
  BsFillCollectionPlayFill,
  BsFire,
} from "react-icons/bs";

import {
  AiFillHome,
  AiFillPlaySquare,
  AiOutlineHome,
  AiOutlinePlaySquare,
  AiOutlineSetting,
} from "react-icons/ai";

import { GrHistory } from "react-icons/gr";
import { GoHistory } from "react-icons/go";

import {
  BiHelpCircle,
  BiLike,
  BiMusic,
  BiSolidLike,
  BiTrophy,
} from "react-icons/bi";

import {
  MdOutlineExitToApp,
  MdOutlineReportGmailerrorred,
  MdOutlineSlowMotionVideo,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
  MdSlowMotionVideo,
  MdVideoLibrary,
  MdWatchLater,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStoredUserData } from "../../../services/accountService";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoUser,
  getListUser,
  selectUserInfo,
  selectUserList,
} from "../../../features/auth/userSlice";

const SideBar = ({ sidebar = true }) => {
  const [path, setPath] = useState("");
  const nav = useNavigate();
  const loggerUser = getStoredUserData();
  const user = useSelector(selectUserInfo);
  const users = useSelector(selectUserList);
  const [reRender, setReRender] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setPath(window.location.pathname.substring(1));
    if (loggerUser) {
      if (!user || reRender) {
        dispatch(getInfoUser());
        setReRender(false);
      }
    }
    setUserInfo(user);
    if (user && userInfo) {
      dispatch(getListUser(userInfo.subscriptions));
    }
    setUserList(users);
  }, [dispatch, user]);

  return (
    <nav className={sidebar ? `${style.sidebar} ${style.open}` : style.sidebar}>
      <NavLink to={"/"} activeClassName={"active"}>
        <li>
          {path === "" ? <AiFillHome size={23} /> : <AiOutlineHome size={23} />}
          <span>Home</span>
        </li>
      </NavLink>
      <NavLink to={"/shorts"} activeClassName={"active"}>
        <li>
          {path === "" ? (
            <MdSlowMotionVideo size={23} />
          ) : (
            <MdOutlineSlowMotionVideo size={23} />
          )}
          <span>Shorts</span>
        </li>
      </NavLink>
      <NavLink to={"/subscribed"} activeClassName={"active"}>
        <li>
          {path === "subscribed" ? (
            <BsFillCollectionPlayFill size={23} />
          ) : (
            <BsCollectionPlay size={23} />
          )}
          <span>Subscribed</span>
        </li>
      </NavLink>
      <hr />
      <NavLink to={"/library"} activeClassName={"active-home"}>
        <li>
          {path === "library" ? (
            <MdVideoLibrary size={23} />
          ) : (
            <MdOutlineVideoLibrary size={23} />
          )}
          <span>Library</span>
        </li>
      </NavLink>
      <NavLink to={"/watchedVideos"} activeClassName={"active"}>
        <li>
          {path === "watchedVideos" ? (
            <GrHistory size={23} />
          ) : (
            <GoHistory size={23} />
          )}
          <span>Watched Videos</span>
        </li>
      </NavLink>
      <NavLink to={"/yourVideos"} activeClassName={"active"}>
        <li>
          {path === "yourVideos" ? (
            <AiFillPlaySquare size={23} />
          ) : (
            <AiOutlinePlaySquare size={23} />
          )}
          <span>Your Videos</span>
        </li>
      </NavLink>
      <NavLink to={"/watchLater"} activeClassName={"active"}>
        <li>
          {path === "watchLater" ? (
            <MdWatchLater size={23} />
          ) : (
            <MdOutlineWatchLater size={23} />
          )}
          <span>Watch Later</span>
        </li>
      </NavLink>
      <NavLink to={"/likedVideos"} activeClassName={"active"}>
        <li>
          {path === "likedVideos" ? (
            <BiSolidLike size={23} />
          ) : (
            <BiLike size={23} />
          )}
          <span>Liked Videos</span>
        </li>
      </NavLink>
      <hr />
      {loggerUser ? (
        <div>
          <ul>
            <span>Subscriptions</span>
          </ul>
          {userList && userList.length > 0 ? (
            <ul style={{ padding: 0 }}>
              {userList.map((channel) => (
                <li key={channel.id}>
                  <img src={channel.avatar} alt="avatar" className={style.img__avatar} />
                  <span>
                    {channel.userName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No channel subscribed.</p>
          )}
        </div>
      ) : (
        <p style={{ paddingLeft: "20px" }}>
          Sign in to like videos, comment, and subscribe.
        </p>
      )}

      <hr />

      <ul>
        <span>Explore</span>
      </ul>
      <NavLink to={"/test1"} activeClassName={"active"}>
        <li>
          <BsFire size={23} />
          <span>Trending</span>
        </li>
      </NavLink>
      <NavLink to={"/test2"} activeClassName={"active"}>
        <li>
          <BiMusic size={23} />
          <span>Music</span>
        </li>
      </NavLink>
      <NavLink to={"/test3"} activeClassName={"active"}>
        <li>
          <IoGameControllerOutline size={23} />
          <span>Gaming</span>
        </li>
      </NavLink>
      <NavLink to={"/test4"} activeClassName={"active"}>
        <li>
          <HiOutlineNewspaper size={23} />
          <span>News</span>
        </li>
      </NavLink>
      <NavLink to={"/test5"} activeClassName={"active"}>
        <li>
          <BiTrophy size={23} />
          <span>Sport</span>
        </li>
      </NavLink>
      <hr />
      <ul>
        <span>Others</span>
      </ul>
      <hr />
      <ul>
        <li>
          <AiOutlineSetting size={23} />
          <span>Settings</span>
        </li>
        <li>
          <BiHelpCircle size={23} />
          <span>Guides</span>
        </li>
        <li>
          <MdOutlineReportGmailerrorred size={23} />
          <span>Reports</span>
        </li>
      </ul>
      <hr />
      <li>
        <MdOutlineExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  );
};
export default SideBar;
