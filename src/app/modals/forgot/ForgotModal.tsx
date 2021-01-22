import * as React from "react";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {api} from "../../api/api";
import {IdModal} from "../../modal/IdModal";
import imgAndroid from "../../../assets/images/android.svg";
import imgIos from "../../../assets/images/iphone.svg";
import successLogo from "../../../assets/images/success.png";
import useForm from "react-hook-form";
import {useState} from "react";
import {utilFormValidation} from "../../utils/utilFormValidation";
import {withConsumer} from "../../hoc/withConsumer";
import {toast} from "react-toastify";

export interface IForgotModalProps extends IConsumerModal {}

const ForgotModalInner: React.FC<IForgotModalProps> = ({close, open}) => {
    const {handleSubmit, register, errors} = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = (data: any) => {
        setIsError(false);
        api.requestRecover(data).subscribe((data) => {
            if (data.action === "error") {
                setIsError(true);
                toast.error("Provided email is wrong");
                return;
            }

            if (data.action === "success") {
                setIsSuccess(true);
            }
        });
    };

    return (
        <div className="blocker" onClick={() => close()}>
            <div id="ex3" className="modal modal2" onClick={(event) => event.stopPropagation()}>
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
                    {/* <div className="reg_info">
                        <p className="reg_info1">A minimum of 1 lower case letter [a-z] and</p>
                        <p className="reg_info1">A minimum of 1 upper case letter [A-Z] and</p>
                        <p className="reg_info1">A minimum of 1 numeric character [0-9] and</p>
                        <p className="reg_info2">Name must be at least 4 characters in length.</p>
                        <p className="reg_info2">Passwords must be at least 8 characters in length.</p>
                    </div> */}
                </div>
                <div className="login_right">
                    <div className="login_switch">
                        <div className="login_switch1 active">Reset Password</div>

                        <div className="login_switch1" onClick={() => open(IdModal.RegistrationPrompt)}>
                            Sign up
                        </div>
                    </div>
                    <div className="login_box3">
                        <div className={`registration_success${!isSuccess ? " d-none" : ""}`}>
                            <img className="registration_success-img" src={successLogo} alt="success" />
                            <div className="registration_success-text black">Link Send, Please Check Email</div>
                        </div>
                        <form
                            className={`auth_form${isSuccess ? " d-none" : ""}`}
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate={true}
                        >
                            <div className="auth_input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className={`auth_input mb-10 ${errors.email ? "auth_input-error" : ""}`}
                                    ref={register(utilFormValidation.config.required)}
                                />
                                <div className="auth_input-errorText">
                                    {errors.email && errors.email.type && "email is required"}
                                </div>
                            </div>
                            {/* {isError && <p className="red">Provided email is wrong</p>} */}
                            <button className="auth_button">Send</button>
                        </form>
                    </div>
                </div>
                <span className="close-modal" onClick={() => close()} />
            </div>
        </div>
    );
};

export const ForgotModal = withConsumer(ConsumerModal)(ForgotModalInner);
