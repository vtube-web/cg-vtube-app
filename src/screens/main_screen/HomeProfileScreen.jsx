import { useEffect, useState } from "react";
import {  Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../../assets/css/homeProfile/HomeProfile.css";
import { HiCheckCircle } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import NavItem from "../../components/homeProfile/common/nav_item/NavItem";

import Home from "../../components/homeProfile/view/Home"
import Video from "../../components/homeProfile/view/Video"
import Shorts from "../../components/homeProfile/view/Shorts"
import PlayList from "../../components/homeProfile/view/PlayList"
import About from "../../components/homeProfile/view/About"
import Channel from "../../components/homeProfile/view/Channel"

function HomeProfileScreen() {

 const { userName, subParam} = useParams();
 const navigate = useNavigate();

   useEffect(() => {
     if (subParam == "*") {
       navigate(`/homeProfile/${userName}/featured`);
     }
   }, [subParam]);

const pathAcountDefault = `/homeProfile/${userName}`;


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

const [showInputSearch, setShowInputSearch] = useState(false);

function handleClickIconSearch() {
  setShowInputSearch(!showInputSearch);
}

// Navigate to /query ? = 
function handleSubmit(e) {
  e.preventDefault();
  console.log("thai");
}

  return (
    <div>
      <div className="homeProfile-screen d-flex flex-column h-100 w-100">
        <div className="homeProfile-banner d-flex " />
        <div className="container-fluid p-0 m-0">
          <section className="homeProfile-info bg-white pt-3">
            <div className="container d-flex flex-row w-100 justify-content-center px-2">
              <div className="homeProfile-avartar mb-3 ">
                <img
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/98438484/original/b6d75e78a1805b5f44e2326556787bdae730c6ba/custom-made-youtube-avatar.jpg"
                  className="img-fluid rounded-circle"
                />
              </div>

              <div class="homeProfile-title flex-grow-1 mx-3 py-2 ">
                <div className="flex-item mb-2">
                  <h1 className="fs-2 m-0 p-0 text-black d-flex align-items-center">
                    Thái OCD Vlogs
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
                      ThaiDevOfficial
                    </span>
                  </div>
                  <div class="text-body-tertiary d-flex justify-content-center justify-content-sm-start mx-2 ">
                    ? subscribers
                  </div>
                  <div class="text-body-tertiary d-flex justify-content-center justify-content-sm-start">
                    ? video
                  </div>
                </div>
                <div className="homeProfile-text mt-2 flex-item mb-2">
                  <NavLink to={`${pathAcountDefault}/about`}>
                    <p>Hello Hello ! Welcome to my Channel</p>
                  </NavLink>
                </div>
              </div>

              <div className=" homeProfile-subscribe mt-3 h-10 ">
                <div className="container d-flex flex-row flex-wrap">
                  <Link className="subscribe-btn btn rounded-pill w-30 d-flex justify-content-center">
                    <span className="homeProfile-text ">Tuỳ chỉnh kênh</span>
                  </Link>
                  <Link className="subscribe-btn btn rounded-pill w-30 d-flex justify-content-center">
                    <span className="homeProfile-text">Quản lý video</span>
                  </Link>
                </div>
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
          <div className="homeProfile-content d-flex">
            <div className="container">
              {subParam == "featured" ? <Home /> : <></>}
              {subParam == "videos" ? <Video /> : <></>}
              {subParam == "shorts" ? <Shorts /> : <></>}
              {subParam == "playlists" ? <PlayList /> : <></>}
              {subParam == "channels" ? <Channel /> : <></>}
              {subParam == "about" ? <About /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProfileScreen