import React, { useEffect, useState } from "react";
import "../../assets/css/Login/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectError,
  selectLoading,
  selectSuccess,
} from "../../features/auth/userSlice";

// ../features/auth/userSlice
  function LoginScreen() {
    const logoImg =
      "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png";


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Component state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    //Redux State
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const success = useSelector(selectSuccess);

    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      // Kiểm tra regex cho email
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      setEmailError(
        emailRegex.test(value)
          ? ""
          : "Email not valid - Ex: thainguyengg12@gmail.com"
      );
      console.log(emailError);
    };

      const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // Kiểm tra regex cho password
        const passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/;
        setPasswordError(
          passwordRegex.test(value) ? "" : "Password không hợp lệ "
        );
      };

    const handleLogin = (e) => {
      e.preventDefault();
      let userCredential = {email, password};
      dispatch(loginUser(userCredential))
      .then((result) => {
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
        <div className="form-login bg-dark">
          <div className="form-login-header">
            <img src={logoImg} alt={"logo"} className="form-login-logo" />
            <h1 className="form-login-content ">Login</h1>
          </div>
          <form>
            <div className="mb-3 mt-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={handleEmailChange}
                required
              />
              {Boolean(emailError) && (
                <div className="alert alert-danger">{emailError}</div>
              )}
            </div>
            <div className="mb-3 mt-5">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handlePasswordChange}
                required
              />
              {Boolean(passwordError) && (
                <div className="alert alert-danger">{passwordError}</div>
              )}
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
          <div className="d-flex justify-content-around mt-3 ">
            <p className="mt-4">
              Forgot password? <Link to="/forgot">Forgot</Link>
            </p>
            <p className="mt-4">
              Not a member? <Link to="/register">SignUp now</Link>
            </p>
          </div>
        </div>
      </>
    );
  }

export default LoginScreen;
