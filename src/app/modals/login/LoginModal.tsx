import * as React from "react";
import { ConsumerAuth, IConsumerAuth } from "../../auth/ConsumerAuth";
import { ConsumerModal } from "../../modal/ConsumerModal";
import { IConsumerModal } from "../../modal/IConsumerModal";
import { IdModal } from "../../modal/IdModal";
import { compose } from "recompose";
import imgAndroid from "../../../assets/images/android.svg";
import imgIos from "../../../assets/images/iphone.svg";
import Eye2 from "../../../assets/images/iconfinder_icon-21-eye-hidden_314276.svg";
import Eye1 from "../../../assets/images/iconfinder_icon-22-eye_314277.svg";
import useForm from "react-hook-form";
import { utilFormValidation } from "../../utils/utilFormValidation";
import { withConsumer } from "../../hoc/withConsumer";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

export interface ILoginModalProps extends IConsumerModal, IConsumerAuth {}

const ErrorAlert: React.FC<{ errors: any }> = ({ errors }) => {
  return (
    <div className="position-relative">
      <div className="login-error login-error-active">
        {errors.wrongPassword
          ? "Wrong Email Or Password"
          : errors.WrongCaptcha
          ? "Please Verify Google Captcha"
          : errors.userNotVerified
          ? "Please Confirm E-Mail"
          : errors.email
          ? "Please Enter E-Mail"
          : errors.password
          ? "Please Enter Password"
          : ""}
      </div>
      <div className="reg_ico1" />
    </div>
  );
};

const LoginModalInner: React.FC<ILoginModalProps> = ({
  open,
  close,
  tryAuth,
}) => {
  let captcha: any;
  const [passwordType, setPasswordType] = React.useState<string>("password");

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    getValues,
  } = useForm();

  const changePasswordType = () => {
    setPasswordType("text");
    setTimeout(() => {
      setPasswordType("password");
    }, 1000);
  };

  function onChange(value: any) {
    utilFormValidation.config.captcha.validate.cap = true;
  }

  const [inputValues, setInpuiValues] = React.useState<any>({});

  const oninputChange = () => {
    setInpuiValues(getValues());
  };

  const setCaptchaRef = (ref: any) => {
    if (ref) {
      return (captcha = ref);
    }
  };

  const resetCaptcha = () => {
    captcha.reset();
  };

  const onSubmit = (data: any) => {
    resetCaptcha();

    if (!utilFormValidation.config.captcha.validate.cap) {
      toast.error("Please Verify Google Captcha");
      setError("WrongCaptcha", "notMatch", "Wrong Email Or Password");
    } else {
      utilFormValidation.config.captcha.validate.cap = false;
      clearError("wrongPassword");
      clearError("userNotVerified");

      tryAuth(
        {
          username: data.email,
          password: data.password,
        },
        (data) => {
          close();
        },
        (data) => {
          utilFormValidation.config.captcha.validate.cap = false;
          if (data.error_description === "Bad credentials") {
            toast.error("Wrong Email Or Password");
            setError("wrongPassword", "notMatch", "Wrong Email Or Password");
          } else if (data.error_description === "User is disabled") {
            toast.error("User Not Verified");
            setError("userNotVerified", "notMatch", "User Not Verified");
          }
        }
      );
    }
  };

  return (
    <div className="blocker" onClick={() => close()}>
      <div
        id="ex1"
        className="modal position-relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="login_left hide_mob">
          <div className="popup_app">
            <span style={{ color: "#333" }}>Download our app</span>
            <span style={{ color: "#333", fontSize: 12 }}>
              Cryptoiex is available on Web, iPhone, iPad, Android.
            </span>
            <div className="popup_apps">
              <a href="/">
                <img src={imgAndroid} alt="google play store" />
              </a>
              <a href="/">
                <img src={imgIos} alt="app store" />
              </a>
            </div>
          </div>
          {/* {Object.keys(errors).length > 0 && <ErrorAlert errors={errors} />} */}
        </div>
        <div className="login_right">
          <div className="login_switch">
            <div className="login_switch1 active">Login</div>
            <div
              className="login_switch1"
              onClick={() => open(IdModal.RegistrationPrompt)}
            >
              Sign up
            </div>
          </div>
          <div className="login_box1">
            <form
              className="auth_form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate={true}
            >
              <div
                className={
                  inputValues.email
                    ? "auth_input-wrapper hasValue"
                    : "auth_input-wrapper"
                }
              >
                <input
                  type="email"
                  // placeholder="Email"
                  name="email"
                  className={`auth_input ${
                    errors.email ? "auth_input-error" : ""
                  }`}
                  ref={register(utilFormValidation.config.required)}
                  style={{ height: "100%" }}
                  // onFocus={inputFocusHandler}
                  onChange={oninputChange}
                  id="email"
                />

                <div className="auth_input-errorText">
                  {errors.email && errors.email.type && "email is required"}
                </div>
                <label htmlFor="email" className="placeholder">
                  Email
                </label>
              </div>
              <div
                className={
                  inputValues.password
                    ? "auth_input-wrapper hasValue"
                    : "auth_input-wrapper"
                }
              >
                <img
                  alt=""
                  className="eye"
                  onClick={changePasswordType}
                  src={`${passwordType === "password" ? Eye2 : Eye1}`}
                />
                <input
                  type={passwordType}
                  // placeholder="Password"
                  name="password"
                  className={`auth_input ${
                    errors.password ? "auth_input-error" : ""
                  }`}
                  ref={register(utilFormValidation.config.required)}
                  onChange={oninputChange}
                  id={"password"}
                />
                <div className="auth_input-errorText">
                  {errors.password &&
                    errors.password.type &&
                    "password is required"}
                </div>
                <label htmlFor="password" className="placeholder">
                  Password
                </label>
              </div>

              <span
                className="lost_password"
                onClick={() => open(IdModal.ForgotPrompt)}
              >
                Forgot your password?
              </span>

              <button type="submit" className="auth_button">
                SIGN IN
              </button>
            </form>
            <div className="g-recaptcha">
              <ReCAPTCHA
                ref={(r) => setCaptchaRef(r)}
                sitekey="6LdRYeUUAAAAAJwEXVwwHmkILCBZhavk7zVDRaUQ"
                onChange={onChange}
              />
            </div>
            <div className="hide_desk">
              {Object.keys(errors).length > 0 && <ErrorAlert errors={errors} />}
            </div>
          </div>
        </div>
        <span className="close-modal" onClick={() => close()} />
      </div>
    </div>
  );
};

const enhance = compose<any, any>(
  withConsumer(ConsumerModal),
  withConsumer(ConsumerAuth)
);

export const LoginModal = enhance(LoginModalInner);
