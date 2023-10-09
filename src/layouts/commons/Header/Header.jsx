import style from '../../../assets/scss/Components/Layout/_header.module.scss'

import {FaBars} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {MdNotifications, MdApps} from "react-icons/md";
import {Link, Route, Routes} from "react-router-dom";
import SignInScreen from "../../../screens/signInScreen/SignInScreen";
import {FiMoreVertical} from "react-icons/fi";
import {PiUserCircleThin} from "react-icons/pi";
import {hover} from "@testing-library/user-event/dist/hover";


import {getStoredUserData} from '../../../service/accountService';
import NavEnd from "../../../components/studio/nav_bar/nav_end/NavEnd";
import {useEffect, useState} from 'react';


export default function Header({handleSetSidebar}) {
    const logoImg =
        "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png";

    const userLogo =
        "https://cdn.discordapp.com/attachments/1151490874195316856/1152776018638151710/icons8-user-64.png";

    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(getStoredUserData());
    }, [user]);

    return (
        <div className={style.header}>
            <div className={style.header__menu__logo}>
                <FaBars
                    className={style.header__menu}
                    size={26}
                    onClick={() => handleSetSidebar()}
                />
                <Link to={"/"}>
                    <img src={logoImg} alt={"logo"} className={style.header__logo}/>
                </Link>
            </div>

            <form>
                <input type={"text"} placeholder={"Search here..."}/>
                <button type={"submit"}>
                    <AiOutlineSearch size={22}/>
                </button>
            </form>

            {user ? (
                <NavEnd/>
            ) : (
                <div className={style.header__icons}>
                    <FiMoreVertical size={23}/>
                    <span>
            <Link to={"/signIn"} className={style.signIn}>
              <PiUserCircleThin size={25}/>
              Sign in
            </Link>
          </span>
                </div>
            )}
        </div>
    );
}