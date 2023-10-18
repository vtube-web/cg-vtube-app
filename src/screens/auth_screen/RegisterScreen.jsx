import "../../assets/css/register/register-form.css";
import {PiEye, PiEyeSlash} from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

import formatUserName from '../../format/FormatUserName';

import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import {
  checkEmail,
  registerAccount,
  resetUserAccountState,
  selectCheckEmailIsSuccess,
  selectRegisterIsError,
  selectRegisterIsSuccess,
  selectUserAccountSliceIsError,
} from "../../features/auth/userSlice";
import logo from "../../assets/img/logo-vtube-2.png"
import GoogleButton from "../../components/googleButton/GoogleButton";

function RegisterScreen() {
  const logoImg = logo;

  const avatarImgDefault =
    "https://firebasestorage.googleapis.com/v0/b/vtube-15.appspot.com/o/images%2F387123399_317289870909894_6318809251513139950_n.jpg?alt=media&token=9a676663-abbe-4324-aba8-a634e63b305c&_gl=1*1vll957*_ga*MTE0NzY2MDExNy4xNjkxMDI4NDc2*_ga_CW55HF8NVT*MTY5NzEyNTg4NC4yOC4xLjE2OTcxMjU5MjAuMjQuMC4w";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This Component State
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [retypePasswordNotMatchPassword, setRetypePasswordNotMatchPassword] =
    useState(false);

  // UserAccountSlice State
  const registerSuccess = useSelector(selectRegisterIsSuccess);
  const registerError = useSelector(selectRegisterIsError);
  const checkEmailSuccess = useSelector(selectCheckEmailIsSuccess);
  const status = useSelector(selectUserAccountSliceIsError);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      retypePassword: "",
      acceptTermAndConditions: false,
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required("What's your name?")
        .test(
          "not number",
          "User name not contain a number",
          (value) => value && /(^[^\d]*$)/.test(value)
        )
        .test(
          "not contain special characters",
          "User name not contain a special character like :@,_#$",
          (value) =>
            value &&
            /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i.test(
              value
            )
        ),
      email: Yup.string()
        .required("Please enter your email!")
        .matches(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          "Please enter a valid email address! ex: example12@gmail.com"
        ),
      password: Yup.string()
        .required("Please enter password!")
        .test(
          "lowercase",
          "Must contain at least one lowercase letter",
          (value) => value && /(?=.*[a-z])/.test(value)
        )
        .test(
          "uppercase",
          "Must contain at least one uppercase letter",
          (value) => value && /(?=.*[A-Z])/.test(value)
        )
        .test(
          "digit",
          "Must contain at least one digit",
          (value) => value && /(?=.*\d)/.test(value)
        )
        .test(
          "special character",
          "Must contain at least 1 special character",
          (value) => value && /(?=.*[@#$%^&+=!])/.test(value)
        )
        .test(
          "length",
          "Password must be 8-16 characters",
          (value) => value && /[A-Za-z\d@#$%^&+=!]{8,16}/.test(value)
        ),
      retypePassword: Yup.string().required("Please enter Retype Password"),
      acceptTermAndConditions: Yup.boolean().oneOf([true]).required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      let user = {
        channelName: values.userName,
        userName: formatUserName(values.userName),
        email: values.email,
        password: values.password,
        avatar: avatarImgDefault,
      };
      console.log(user);
      dispatch(registerAccount(user));
    },
  });

  
  useEffect(() => {
    if (registerSuccess) {
      dispatch(resetUserAccountState());
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your account has been registered ! Please login !",
      });
      navigate("/login");
    }
  }, [registerSuccess]);


  useEffect(() => {
    if (registerError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    return () => {
      dispatch(resetUserAccountState());
    };
  }, [registerError]);

    useEffect(() => {
      if (checkEmailSuccess) {
        setEmailExists(false);
      }
      if (status === "409") {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    }, [checkEmailSuccess]);


  const checkEmailExists = (email) => {
    let emailUser = {
      email: email
    }
    dispatch(checkEmail(emailUser));
  };

  const checkRetypePasswordMatch = (retypePassword) => {
    if (formik.values.password === retypePassword) {
      setRetypePasswordNotMatchPassword(false);
    } else {
      setRetypePasswordNotMatchPassword(true);
    }
  };

  let isInvalidUserName = formik.touched.userName && formik.errors.userName;
  let isInvalidEmail = formik.touched.email && formik.errors.email;
  let isInvalidPassword = formik.touched.password && formik.errors.password;
  let isInvalidRetypePassword = formik.touched.retypePassword && formik.errors.retypePassword;

  return (
    <div className="d-flex justify-content-center align-items-center form-register-container">
      <div className="form-register bg-dark">
        <div className="form-register-header">
          <img src={logoImg} alt={"logo"} className="form-register-logo" />
          <h1 className="form-register-content">Register</h1>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <OverlayTrigger
            placement="right"
            show={isInvalidUserName ? true : false}
            overlay={
              <Tooltip id="tooltip-right" className="custom-tooltip">
                {formik.errors.userName}
              </Tooltip>
            }
          >
            <div className="mb-4 mt-4">
              <label
                htmlFor="email"
                className="form-label mt-2 mb-2 text-warning"
              >
                Name :
              </label>
              <input
                type="text"
                name="userName"
                className="form-control input-register p-0"
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </OverlayTrigger>

          {/* Email */}
          <OverlayTrigger
            placement="right"
            show={isInvalidEmail || emailExists}
            overlay={
              <Tooltip className="custom-tooltip">
                {isInvalidEmail
                  ? formik.errors.email
                  : emailExists
                  ? "This email is already used"
                  : null}
              </Tooltip>
            }
          >
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
                id="email"
                className="form-control input-register p-0"
                value={formik.values.email}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  checkEmailExists(e.target.value);
                }}
                onChange={formik.handleChange}
              />
            </div>
          </OverlayTrigger>

          {/* Password */}
          <OverlayTrigger
            placement="right"
            show={isInvalidPassword ? true : false}
            overlay={
              <Tooltip className="custom-tooltip">
                {formik.errors.password}
              </Tooltip>
            }
          >
            <div className="mb-4 mt-4">
              <span className="text-warning">Password :</span>
              <div className="mt-0 mb-2 input-group flex-nowrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control input-register p-0 mt-2"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <span>
                  <i
                    aria-hidden="true"
                    className="input-group-text icon-password-register-controller"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <PiEye size={23} />
                    ) : (
                      <PiEyeSlash size={23} />
                    )}
                  </i>
                </span>
              </div>
            </div>
          </OverlayTrigger>

          {/*Confirm password*/}
          <OverlayTrigger
            placement="right"
            show={isInvalidRetypePassword || retypePasswordNotMatchPassword}
            overlay={
              <Tooltip className="custom-tooltip">
                {isInvalidRetypePassword
                  ? formik.errors.retypePassword
                  : retypePasswordNotMatchPassword
                  ? "ReType-Password do not match"
                  : null}
              </Tooltip>
            }
          >
            <div className="mb-4 mt-4">
              <span className="text-warning">Re-type Password :</span>
              <div className="mt-0 mb-2 input-group flex-nowrap">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  name="retypePassword"
                  id="retypePassword"
                  className="form-control input-register p-0 mt-2"
                  value={formik.values.retypePassword}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                    checkRetypePasswordMatch(e.target.value);
                  }}
                  required
                />
                <span>
                  <i
                    aria-hidden="true"
                    className="input-group-text icon-password-register-controller"
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                  >
                    {showRetypePassword ? (
                      <PiEye size={23} />
                    ) : (
                      <PiEyeSlash size={23} />
                    )}
                  </i>
                </span>
              </div>
            </div>
          </OverlayTrigger>
          {/* Term and Condition */}
          <div className="form-register-checkbox-controll">
            <input
              type="checkbox"
              id="acceptTermAndConditions"
              checked={formik.values.acceptTermAndConditions}
              onChange={formik.handleChange}
              name="acceptTermAndConditions"
              onBlur={formik.handleBlur}
              value="acceptTermAndConditions"
            />
            <label className="p-0">Accept Term and Conditions</label>
          </div>

          <button
            type="submit"
            className="btn btn-warning mt-3 register-button"
          >
            Register
          </button>

          {/* Another Option */}
          <p className="mt-2">
            Already have an Account? <Link to="/login"> Login</Link>
          </p>
          <p> Or? </p>
        </Form>

        <GoogleButton/>
      </div>
    </div>
  );
}

export default RegisterScreen;
