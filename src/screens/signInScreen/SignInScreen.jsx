import style from "../../assets/scss/Components/SignIn/_signIn.module.scss";
import {PiUserCircleThin} from "react-icons/pi";
import {SiGnuprivacyguard} from "react-icons/si"
import {FcGoogle} from "react-icons/fc"
import { useNavigate } from "react-router-dom";


export default function SignInScreen() {
    const navigate = useNavigate();

    function handleAndNavigateToSignInPage() {
      navigate("/login");
    }
    
    function handleAndNavigateToRegisterPage() {
      navigate("/register");
    }


    const logoImg = "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png"
    return (
      <div className={style.signIn__container}>
        <img src={logoImg} alt={"logo"} />
        <p className={style.signIn__content}>
          Sign in to see updates from your favorite YouTube channels
        </p>
        <div className={style.signIn__function}>
          <button onClick={handleAndNavigateToSignInPage}>
            <span className={style.function__btn}>
              <PiUserCircleThin size={25} />
              Sign in
            </span>
          </button>
          <button onClick={handleAndNavigateToRegisterPage}>
            <span className={style.function__btn}>
              <SiGnuprivacyguard size={25} />
              Sign up
            </span>
          </button>
        </div>
        <div className={style.signIn__function}>
          <span className={style.function__signIn__google}>
            <FcGoogle size={25}></FcGoogle>
            Sign in with google
          </span>
        </div>
      </div>
    );
}