import * as React from "react";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {IUserParams} from "../../api/models/request/IUserParams";
import {IdModal} from "../../modal/IdModal";
import {IdPath} from "../../router/IdPath";
import {NavLink} from "react-router-dom";
import {api} from "../../api/api";
import imgAndroid from "../../../assets/images/android.svg";
import imgIos from "../../../assets/images/iphone.svg";
import successLogo from "../../../assets/images/success.png";
import Eye2 from "../../../assets/images/iconfinder_icon-21-eye-hidden_314276.svg";
import Eye1 from "../../../assets/images/iconfinder_icon-22-eye_314277.svg";
import useForm from "react-hook-form";
import {useState, useEffect} from "react";
import {utilFormValidation} from "../../utils/utilFormValidation";
import {withConsumer} from "../../hoc/withConsumer";
import {toast} from "react-toastify";

export interface IRegistrationModalProps extends IConsumerModal {}

const RegistrationModalInner: React.FC<IRegistrationModalProps> = ({open, close}) => {
    const {clearError, errors, handleSubmit, register, setError, watch, getValues} = useForm();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [countrys, setCountrys] = useState([]);
    const [countrysFetching, setCountrysFetching] = useState<boolean>(true);
    const [inputValues, setInpuiValues] = React.useState<any>({});
    const [passwordType, setPasswordType] = React.useState<string>("password");

    const changePasswordType = () => {
        setPasswordType("text");
        setTimeout(() => {
            setPasswordType("password");
        }, 1000);
    };

    const oninputChange = () => {
        setInpuiValues(getValues());
        // console.log(inputValues);
    };

    useEffect(() => {
        api.getCountrys().subscribe((response) => {
            setCountrys(response.data);
            setCountrysFetching(false);
        });
    }, []);

    const onSubmit = (data: IUserParams) => {
        api.register(data).subscribe((data) => {
            let errorMessage: string | null = null;
            if (data.action && data.action.toLowerCase() === "error") {
                if (data.ERROR_CODE === "EMAIL_UNIQUE_FAILED") {
                    errorMessage = "Email Unqiue Failed";
                    // setError("emailUnique", "EMAIL_UNIQUE_FAILED");
                    // return;
                }
            }

            if (!data.username) {
                errorMessage = "Something went wrong. Please, try again.";
            }
            if (!errorMessage) setIsSuccess(true);
            else toast.error(errorMessage);
        });
    };

    const closeModal = () => close();

    return (
        <div className="blocker RegistrationModal" onClick={closeModal}>
            <div id="ex1" className="modal modal3 position-relative" onClick={(event) => event.stopPropagation()}>
                <div className="login_left hide_mob">
                    <div className="popup_app">
                        <span style={{color: "#333"}}>Download our app</span>
                        <span style={{color: "#333", fontSize: 12}}>
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
                    <div className="reg_info">
                        <p className="reg_info1">A minimum of 1 lower case letter [a-z] and</p>
                        <p className="reg_info1">A minimum of 1 upper case letter [A-Z] and</p>
                        <p className="reg_info1">A minimum of 1 numeric character [0-9] and</p>
                        <p className="reg_info2">Name must be at least 2 characters in length.</p>
                        <p className="reg_info2">Passwords must be at least 8 characters in length.</p>
                    </div>
                </div>
                <div className="login_right">
                    <div className="login_switch">
                        <div className="login_switch1" onClick={() => open(IdModal.LoginPrompt)}>
                            Login
                        </div>

                        <div className="login_switch1 active">Sign up</div>
                    </div>
                    <div className="login_box2">
                        {countrysFetching ? null : (
                            <>
                                <div className={`registration_success${!isSuccess ? " d-none" : ""}`}>
                                    <img className="registration_success-img" src={successLogo} alt="success" />
                                    <div className="registration_success-text" style={{color: "#333"}}>
                                        You have been successfully registered. <br />
                                        Please check your Email and follow the instructions
                                    </div>
                                </div>
                                <form
                                    className={`auth_form${isSuccess ? " d-none" : ""}`}
                                    onSubmit={handleSubmit(onSubmit as any)}
                                    noValidate={true}
                                >
                                    <div
                                        className={
                                            inputValues.firstname ? "auth_input-wrapper hasValue" : "auth_input-wrapper"
                                        }
                                    >
                                        <input
                                            type="text"
                                            // placeholder="Name"
                                            name="firstname"
                                            className={`auth_input ${errors.firstname ? "auth_input-error" : ""}`}
                                            ref={register(utilFormValidation.config.name)}
                                            onChange={oninputChange}
                                            id="firstname"
                                        />
                                        <div className="auth_input-errorText">
                                            {errors.firstname && errors.firstname.type === "minLength"
                                                ? "name must be at least 2 characters in length."
                                                : "name is required"}
                                        </div>
                                        <label htmlFor="firstname" className="placeholder">
                                            Name
                                        </label>
                                    </div>
                                    <div
                                        className={
                                            inputValues.lastname ? "auth_input-wrapper hasValue" : "auth_input-wrapper"
                                        }
                                    >
                                        <input
                                            type="text"
                                            id="Surname"
                                            name="lastname"
                                            className={`auth_input${errors.lastname ? " auth_input-error" : ""}`}
                                            ref={register(utilFormValidation.config.name)}
                                            onChange={oninputChange}
                                        />
                                        <div className="auth_input-errorText">
                                            {errors.lastname && errors.lastname.type === "minLength"
                                                ? "lastname must be at least 2 characters in length."
                                                : "lastname is required"}
                                        </div>
                                        <label htmlFor="Surname" className="placeholder">
                                            Surname
                                        </label>
                                    </div>

                                    <div
                                        className={
                                            inputValues.username ? "auth_input-wrapper hasValue" : "auth_input-wrapper"
                                        }
                                    >
                                        <input
                                            type="email"
                                            id="Email"
                                            name="username"
                                            className={`auth_input${errors.username ? " auth_input-error" : ""}`}
                                            ref={register(utilFormValidation.config.email)}
                                            onChange={() => {
                                                if (errors.emailUnique) {
                                                    clearError("emailUnique");
                                                }
                                                oninputChange();
                                            }}
                                        />
                                        <div className="auth_input-errorText">
                                            {errors.username && errors.username.type === "email"
                                                ? "wrong email format"
                                                : "email is required"}
                                        </div>
                                        <label htmlFor="Email" className="placeholder">
                                            Email
                                        </label>
                                    </div>
                                    <select
                                        className="custom-select"
                                        name="country"
                                        ref={register(utilFormValidation.config.required)}
                                    >
                                        {countrys.map((country: any) => {
                                            return <option value={country.id}>{country.name}</option>;
                                        })}
                                    </select>

                                    <div
                                        className={
                                            inputValues.password ? "auth_input-wrapper hasValue" : "auth_input-wrapper"
                                        }
                                    >
                                        <img
                                            className="eye"
                                            onClick={changePasswordType}
                                            src={`${passwordType === "password" ? Eye2 : Eye1}`}
                                        />
                                        <input
                                            type={passwordType}
                                            id="Password"
                                            name="password"
                                            className={`auth_input${errors.password ? " auth_input-error" : ""}`}
                                            ref={register(utilFormValidation.config.password)}
                                            onChange={oninputChange}
                                        />
                                        <div className="auth_input-errorText">
                                            {errors.password && errors.password.type === "minLength"
                                                ? "Passwords must be at least 8 characters in length"
                                                : errors.password && errors.password.type === "lowerCase"
                                                ? "A minimum of 1 lower case letter [a-z] and"
                                                : errors.password && errors.password.type === "upperCase"
                                                ? "A minimum of 1 upper case letter [A-Z] and"
                                                : errors.password && errors.password.type === "numeric"
                                                ? "A minimum of 1 numeric character [0-9] and"
                                                : "password is required"}
                                        </div>
                                        <label htmlFor="Password" className="placeholder">
                                            Password
                                        </label>
                                    </div>
                                    <div
                                        className={
                                            inputValues.passwordConfirm
                                                ? "auth_input-wrapper hasValue"
                                                : "auth_input-wrapper"
                                        }
                                    >
                                        <img
                                            className="eye"
                                            onClick={changePasswordType}
                                            src={`${passwordType === "password" ? Eye2 : Eye1}`}
                                        />

                                        <input
                                            type={passwordType}
                                            id="RepeatPassword"
                                            name="passwordConfirm"
                                            className={`auth_input${errors.passwordConfirm ? " auth_input-error" : ""}`}
                                            ref={register({
                                                required: true,
                                                validate: {
                                                    confirm: (value) => value === watch("password"),
                                                },
                                            })}
                                            onChange={oninputChange}
                                        />
                                        <div className="auth_input-errorText">
                                            {errors.passwordConfirm && errors.passwordConfirm.type === "confirm"
                                                ? "passwords not equal"
                                                : "password confirmation is required"}
                                        </div>
                                        <label htmlFor="RepeatPassword" className="placeholder">
                                            Repeat Password
                                        </label>
                                    </div>
                                    <span className="lost_password" onClick={() => open(IdModal.ForgotPrompt)}>
                                        Forgot your password?
                                    </span>
                                    <button type="submit" className="auth_button">
                                        SIGN UP
                                    </button>
                                </form>
                                {errors.emailUnique && <div className="red">This Email is already registered</div>}
                                <div className={`registration_terms${isSuccess ? " d-none" : ""}`}>
                                    <span className={`registration_terms_text ${errors.check ? "red" : ""}`}>
                                        <input
                                            type="checkbox"
                                            name="check"
                                            ref={register(utilFormValidation.config.required)}
                                        />
                                        By clicking "SIGN UP" you agree to the &nbsp;
                                        <NavLink to={IdPath.Terms} className="registration_terms_anchor" target="blank">
                                            Terms of Service
                                        </NavLink>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <span className="close-modal" onClick={closeModal} />
            </div>
        </div>
    );
};

export const RegistrationModal = withConsumer(ConsumerModal)(RegistrationModalInner);
