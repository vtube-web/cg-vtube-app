import style from '../../../assets/scss/layout/_header.module.scss'
import logo from "../../../assets/img/logo-vtube.png"

import {FaBars} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {Link} from "react-router-dom";
import {FiMoreVertical} from "react-icons/fi";
import {PiUserCircleThin} from "react-icons/pi";
import {getStoredUserData} from '../../../services/accountService';
import NavEnd from "../studio/navbar/nav_end/NavEnd";
import {useEffect, useState} from 'react';


export default function Header({handleSetSidebar}) {

    const logoImg = logo;

    const [user, setUser] = useState({});
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