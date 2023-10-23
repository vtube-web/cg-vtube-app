import React, {useEffect, useRef, useState} from "react";
import {CiCircleQuestion} from "react-icons/ci";
import MenuAccount from "./MenuAccount";
import {getStoredUserData} from "../../../../../services/accountService";

function NavEnd() {
    const [mouseAvatar, setMouseAvatar] = useState(false);
    const [mouseHelp, setMouseHelp] = useState(false);
    const [clickAvatar, setClickAvatar] = useState(false);
    const user = getStoredUserData();
    const myRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (myRef.current && !myRef.current.contains(event.target)) {
                setClickAvatar(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div className="col-4 flex justify-end items-center space-x-5 relative">
            <div
                className="relative"
                onMouseOver={() => setMouseHelp(true)}
                onMouseOut={() => setMouseHelp(false)}
            >
                <CiCircleQuestion className="flex-1 w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-600"/>
                {mouseHelp === false ? (
                    <></>
                ) : (
                    <div
                        className="absolute z-10 top-[62px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
                        Help
                    </div>
                )}
            </div>
            <div
                className="relative"
                onMouseOver={() => setMouseAvatar(true)}
                onMouseOut={() => setMouseAvatar(false)}
                onClick={() => {
                    setClickAvatar(!clickAvatar);
                }}
                ref={myRef}
            >
                <img
                    className="w-9 h-9 border rounded-full flex-none hover:cursor-pointer"
                    src={`${user?.avatar}`}
                    alt="avatar"
                />
                {mouseAvatar === false ? (
                    <></>
                ) : (
                    <div
                        className="absolute z-10 top-[70px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
                        Account
                    </div>
                )}
            </div>
            {clickAvatar ? <MenuAccount/> : <></>}
        </div>
    );
}

export default NavEnd;
