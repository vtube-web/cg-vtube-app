import style from '../../../assets/scss/layout/_header.module.scss'
import logo from "../../../assets/img/logo-vtube.png"
import {FaBars} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {FiMoreVertical} from "react-icons/fi";
import {PiUserCircleThin} from "react-icons/pi";
import NavEnd from "../studio/navbar/nav_end/NavEnd";
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {resetUserAccountState, selectLoginIsSuccess} from "../../../features/auth/userSlice";

export default function Header({handleSetSidebar}) {
    const dispatch = useDispatch();
    const user = localStorage.getItem("user");
    const success = useSelector(selectLoginIsSuccess);
    const navigate = useNavigate();

    const logoImg = logo;

    useEffect(() => {
        if (success) {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            }
        }
        return () => {
            dispatch(resetUserAccountState())
        }
    }, [success, user]);


  return (
    <div className={style.header}>
      <div className={style.header__menu__logo}>
        <FaBars
          className={style.header__menu}
          size={26}
          onClick={() => handleSetSidebar()}
        />
        <Link to={"/"}>
          <img src={logoImg} alt={"logo"} className={style.header__logo} />
        </Link>
      </div>
            <form>
                <input type={"text"} className={style.search__bar} placeholder={"Search"}/>
                <button type={"submit"}>
                    <AiOutlineSearch size={24}/>
                </button>
            </form>

            {user ? (
                <NavEnd className="col-1"/>
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