import style from '../../../assets/scss/Components/Layout/_header.module.scss'

import {FaBars} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {MdNotifications, MdApps} from "react-icons/md";
import {Link, Route, Routes} from "react-router-dom";
import LoginScreen from "../../../screens/loginScreen/LoginScreen";

export default function Header({handleSetSidebar}) {
    const logoImg = "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png"
    const userLogo = "https://cdn.discordapp.com/attachments/1151490874195316856/1152776018638151710/icons8-user-64.png"
    return (
        <div className={style.header}>
            <div className={style.header__menu__logo}>
                <FaBars
                    className={style.header__menu}
                    size={26}
                    onClick={() => handleSetSidebar()}
                />
                <img src={logoImg} alt={"logo"} className={style.header__logo}/>
            </div>

            <form>
                <input type={"text"} placeholder={"Search here..."}/>
                <button type={"submit"}>
                    <AiOutlineSearch size={22}/>
                </button>
            </form>

            <div className={style.header__icons}>
                <MdNotifications size={28}/>
                <MdApps size={28}/>
                {/*<Link to={"/login"}>*/}
                <img src={userLogo} alt={"avatar"}/>
                {/*</Link>*/}
            </div>
        </div>
    )
}