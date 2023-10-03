import React, { useEffect, useState } from "react";
import "../../assets/css/Login/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectError,
  selectLoading,
  selectSuccess,
} from "../../features/auth/userSlice";
import { PiEye, PiEyeSlash } from "react-icons/pi";

// ../features/auth/userSlice
function LoginScreen() {
  const logoImg =
    "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //Redux State
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);

  const handleLogin = (e) => {
    e.preventDefault();
    let userCredential = { email, password };
    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  // In Case user Login success then User click back on Browser => That will not allowed
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="form-login bg-dark">
          <div className="form-login-header">
            <img src={logoImg} alt={"logo"} className="form-login-logo" />
            <h1 className="form-login-content ">Login</h1>
          </div>
          <form>
            <div className="mb-4 mt-4">
              <label htmlFor="email" className="form-label mt-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <label className="form-label ">Password</label>
            <div className="mt-0 mb-2 input-group ">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                required
              />
              <i onClick={togglePassword}>
                {showPassword ? <PiEye size={23} /> : <PiEyeSlash size={23} />}
              </i>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-light mt-3 login-button"
              onClick={handleLogin}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="d-flex justify-content-between mt-3 ">
            <p className="mt-4">
              Forgot password? <Link to="/forgot">Forgot</Link>
            </p>
            <p className="mt-4">
              Not a member? <Link to="/register">SignUp now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
