import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import {CiYoutube, CiLogin} from "react-icons/ci";
import {PiUserSquareLight} from "react-icons/pi";
import {resetUserAccountState} from "../../../../../features/auth/userSlice";
import {useDispatch} from "react-redux";
import {getStoredUserData} from "../../../../../services/accountService";

function MenuAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user= getStoredUserData();


    function handleLogout() {
        localStorage.removeItem("user");
        dispatch(resetUserAccountState());
        navigate("/");
    }

    function handleYourChanel() {
        navigate(`/channel/${user.id}`)
    }

    function handleReturnHome() {
        navigate("/")
    }

    return (
      <div className="absolute bg-white top-9 w-10/12 text-sm shadow-2xl border-1 rounded-xl py-3 ">
        <div className="flex space-x-5 items-center border-b-[1px] px-4 pb-3">
          <img
            className="w-10 h-10 border rounded-full flex-none hover:cursor-pointer"
            src={`${user?.avatar}`}
            alt="avatar"
          />
          <div>
            <div>{user?.channelName}</div>
            <div>@{user?.userName}</div>
          </div>
        </div>
        <div
          className="flex space-x-4 items-center px-4 py-2 mt-1 hover:bg-gray-100 hover:cursor-pointer"
          onClick={handleYourChanel}
        >
          <PiUserSquareLight className="w-6 h-6 text-gray-400" />
          <div>Your channel</div>
        </div>
        <div
          className="flex space-x-4 items-center px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
          onClick={handleReturnHome}
        >
          <CiYoutube className="w-6 h-6 text-gray-400" />
          <div>Vtube</div>
        </div>
        <div
          className="flex space-x-4 items-center px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <CiLogin className="w-6 h-6 text-gray-400" />
          <div>Logout</div>
        </div>
      </div>
    );
}

export default MenuAccount;
