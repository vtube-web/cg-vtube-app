import { useEffect, useState } from "react";
import "../../assets/css/login/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectLoginIsSuccess,
  selectUserAccountSliceIsError,
  selectUserAccountSliceIsLoading,
  selectUserData,
} from "../../features/auth/userSlice";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

function LoginScreen() {
  const logoImg =
    "https://cdn.discordapp.com/attachments/1139963455038832680/1153326437185626143/AS1.png";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component state
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //User Account Slice State
  const loading = useSelector(selectUserAccountSliceIsLoading);
  const error = useSelector(selectUserAccountSliceIsError);
  const success = useSelector(selectLoginIsSuccess);
  const user = useSelector(selectUserData);


  useEffect(() => {
    if (success && user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  }, [success]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      let userCredential = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginUser(userCredential));
    },
  });
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center form-login-container">
        <div className="form-login bg-dark">
          <div className="form-login-header">
            <img src={logoImg} alt="logo" className="form-login-logo" />
            <h1 className="form-login-content ">Login</h1>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-4 mt-4">
              <label
                htmlFor="email"
                className="form-label mt-2 mb-2 text-warning"
              >
                Email :
              </label>
              <input
                type="email"
                name="email"
                className="form-control input-login p-0"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <span className="text-warning">Password :</span>
            <div className="mt-0 mb-2 input-group flex-nowrap ">
              <label htmlFor="password" className="form-label"></label>
              <input

                type={showPassword ? "text" : "password"}
                className="form-control input-login p-0"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <i
                onClick={togglePassword}
                className="input-group-text icon-password-login-controller"
              >
                {showPassword ? <PiEye size={23} /> : <PiEyeSlash size={23} />}
              </i>
            </div>

            {error && (
              <div className="error-login-control" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-warning mt-3 login-button">
              {loading ? "Loading..." : "login"}
            </button>
          </Form>

          <div className="d-flex justify-content-between mt-3">
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