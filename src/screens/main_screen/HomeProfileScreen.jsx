import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../../assets/css/homeProfile/HomeProfile.css";
import { HiCheckCircle } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import NavItem from "../../components/homeProfile/common/nav_item/NavItem";

import Home from "../../components/homeProfile/view/Home";
import Video from "../../components/homeProfile/view/Video";
import Shorts from "../../components/homeProfile/view/Shorts";
import PlayList from "../../components/homeProfile/view/PlayList";
import About from "../../components/homeProfile/view/About";
import Channel from "../../components/homeProfile/view/Channel";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoUser,
  selectUserInfo,
} from "../../features/auth/userSlice";
import formatNumberView from "../../format/FormatNumberView";
import axios from "axios";
import { getStoredUserData } from "../../services/accountService";
import { ToastContainer, toast } from "react-toastify";
import {
  addSubscriber,
  removeSubscribed,
} from "../../features/video/subscriberSlice";

function HomeProfileScreen() {
  const { userName, subParam } = useParams();

  const myDataInfo = useSelector(selectUserInfo);
  const [myInfo, setMyInfo] = useState({});
  const loggerUser = getStoredUserData();

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInputSearch, setShowInputSearch] = useState(false);
  const pathAcountDefault = `/homeProfile/${userName}`;
  const [isSubscribed, setIsSubscribed] = useState(true);
  const menus = [
    {
      to: `${pathAcountDefault}/featured`,
      title: "Home",
    },

    {
      to: `${pathAcountDefault}/videos`,
      title: "Video",
    },

    {
      to: `${pathAcountDefault}/shorts`,
      title: "Shorts",
    },
    {
      to: `${pathAcountDefault}/playlists`,
      title: "Playlist",
    },
    {
      to: `${pathAcountDefault}/channels`,
      title: "Channel",
    },
    {
      to: `${pathAcountDefault}/about`,
      title: "About",
    },
  ];


  useEffect(() => {
    if (subParam == "*") {
      navigate(`/homeProfile/${userName}/featured`);
    }
  }, [subParam]);

  useEffect(() => {
    const fetchDataUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userName.slice(1)}`,
          {
            headers: {
              Authorization: "Bearer " + getStoredUserData().accessToken,
            },
          }
        );
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchDataUserInfo();
  }, [userName]);


  useEffect(() => {
    if (loggerUser) {
      if (!myDataInfo) {
        dispatch(getInfoUser());
      }
      setMyInfo(myDataInfo);
    }
    const subscribed = isChannelSubscribed(userInfo?.id);
    setIsSubscribed(subscribed);
  }, [myDataInfo, userName, userInfo]);


  useEffect(() => {
    if(userInfo) {
      dispatch(getInfoUser());
    } else {
      setMyInfo(myDataInfo);
    }
  },[userName]);


  
  const isChannelSubscribed = (channelId) => {
    const subscribedChannels = myInfo?.subscriptions;
    return subscribedChannels ? subscribedChannels.includes(channelId) : false;
  };

  function handleClickIconSearch() {
    setShowInputSearch(!showInputSearch);
  }

  // Navigate to /query ? =
  function handleSubmit(e) {
    e.preventDefault();
  }


  const handleSubscribeClick = (id) => {
    try {
      if (loggerUser) {
        if (isSubscribed) {
          dispatch(removeSubscribed(id));
        } else {
          dispatch(addSubscriber(id));
        }
        setIsSubscribed(!isSubscribed);
        toast.success(
          isSubscribed ? "Subscription removed" : "Subscription added",
          {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    } catch (error) {
      toast.error("Failed to subscribe/unsubscribe:", error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <div className="homeProfile-screen d-flex flex-column h-100 w-100">
        <div
          className="homeProfile-banner d-flex"
          style={{ backgroundImage: `url(${userInfo?.banner})` }}
        />
        <div className="container-fluid p-0 m-0">
          <section className="homeProfile-info bg-white pt-3">
            <div className="container d-flex flex-row w-100 justify-content-center px-2">
              <div className="homeProfile-avartar mb-3 ">
                <img
                  src={userInfo?.avatar}
                  className="img-fluid rounded-circle"
                />
              </div>

              <div class="homeProfile-title flex-grow-1 mx-3 py-2 ">
                <div className="flex-item mb-2">
                  <h1 className="fs-2 m-0 p-0 text-black d-flex align-items-center">
                    {userInfo?.channelName}
                    <i>
                      <HiCheckCircle
                        size={20}
                        className="mt-2 ms-2 text-body-tertiary "
                      />
                    </i>
                  </h1>
                </div>
                <div class="homeProfile-subscriber-count d-flex flex-column flex-sm-row flex-item mb-2 ">
                  <div class="text-body-tertiary d-flex justify-content-center justify-content-sm-start">
                    @
                    <span class="homeProfile-username-text">
                      {userInfo?.userName}
                    </span>
                  </div>
                  <div class="text-body-tertiary d-flex justify-content-center justify-content-sm-start mx-2 ">
                    {userInfo?.subscribers
                      ? `${formatNumberView(userInfo.subscribers)} subscribers`
                      : "0 subscribers"}
                  </div>
                  <div class="text-body-tertiary d-flex justify-content-center justify-content-sm-start">
                    {userInfo?.videoList ? userInfo.videoList.length : 0} video
                  </div>
                </div>

                <div className="homeProfile-text mt-2 flex-item mb-2 col-5">
                  <NavLink to={`${pathAcountDefault}/about`}>
                    {userInfo?.description ? (
                      <p>{userInfo.description}</p>
                    ) : (
                      <p>Hello Hello ! Welcome to my Official Channel </p>
                    )}
                  </NavLink>
                </div>
              </div>
              <ToastContainer />
              <div className=" homeProfile-subscribe mt-3 h-10 ">
                {userName.slice(1) == getStoredUserData()?.userName ? (
                  <div className="container d-flex flex-row flex-wrap">
                    <Link className="subscribe-btn btn rounded-pill w-30 d-flex justify-content-center">
                      <span className="homeProfile-text ">Tuỳ chỉnh kênh</span>
                    </Link>
                    <Link className="subscribe-btn btn rounded-pill w-30 d-flex justify-content-center">
                      <span className="homeProfile-text">Quản lý video</span>
                    </Link>
                  </div>
                ) : (
                  <button
                    className="subscribe-btn btn rounded-pill w-100 d-flex align-items-center"
                    onClick={() => handleSubscribeClick(userInfo.id)}
                  >
                    {isSubscribed ? (
                      <>
                        <i>
                          <BsBell size={22} className="m-2" />
                        </i>
                        Subscribed
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                )}
              </div>

            </div>
          </section>

          <nav class="homeProfile-nav d-flex flex-nowrap text-nowrap h-10 p-0 ">
            <div class="container">
              <ul>
                {menus.map((menu, i) => (
                  <NavItem menu={menu} key={i} />
                ))}
                <Form
                  className="search-item d-flex flex-nowrap"
                  onSubmit={handleSubmit}
                >
                  <div onClick={handleClickIconSearch}>
                    <GoSearch size={24} />{" "}
                  </div>
                  {showInputSearch && (
                    <input
                      type="search"
                      className="search-input"
                      placeholder="Tìm kiếm"
                    />
                  )}
                </Form>
              </ul>
            </div>
          </nav>
          <div className="homeProfile-content ">
            {subParam == "featured" ? <Home /> : <></>}
            {subParam == "videos" ? <Video /> : <></>}
            {subParam == "shorts" ? <Shorts /> : <></>}
            {subParam == "playlists" ? <PlayList /> : <></>}
            {subParam == "channels" ? <Channel subscriptions={userInfo?.subscriptions}/> : <></>}
            {subParam == "about" ? (
              <About
                description={userInfo?.description}
                email={userInfo?.email}
                createdAt={userInfo?.createdAt}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeProfileScreen;
