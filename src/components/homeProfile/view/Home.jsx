import ReactPlayer from "react-player";
import style from './../../../assets/scss/home_profile/_home.module.scss'
import {useEffect, useState} from "react";
import Video from "./Video";
import {selectVideoList} from "../../../features/video/videoSlice";
import {useSelector} from "react-redux";

function Home() {
  return (
    <div className="container">
      Home
    </div>
  )
}

export default Home