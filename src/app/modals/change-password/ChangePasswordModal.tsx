import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../../auth/ConsumerAuth";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {api} from "../../api/api";
import {compose} from "recompose";
import imgAndroid from "../../../assets/images/android.svg";
import imgIos from "../../../assets/images/iphone.svg";
import imgSuccess from "../../../assets/images/success.png";
import useForm from "react-hook-form";
import {useState} from "react";
import {utilBrowser} from "../../utils/utilBrowser";
import {utilFormValidation} from "../../utils/utilFormValidation";
import {withConsumer} from "../../hoc/withConsumer";
import {toast} from "react-toastify";

export interface IChangePasswordModalProps extends IConsumerModal, IConsumerAuth {}

const ChangePasswordModalInner: React.FC<IChangePasswordModalProps> = ({close}) => {
    const {handleSubmit, register, watch} = useForm();
    const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
    const {token} = utilBrowser.searchToObject(window.location.search);

    const onSubmit = (data: any) => {
        const {password, token} = data;

        api.recoverUpdatePassword({password, token}).subscribe((response) => {
            if (response.action === "success") {
                setHasPasswordChanged(true);
                return;
            }

            // TODO: response returns plain text (and invalid one) in case token is wrong
            toast.error("Something went wrong...");
        });
    };

    return (
        <div className="jquery-modal blocker current">
            <div id="ex1" className="modal regg_info position-relative d-inline-block">
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
                        <div className="login_switch1 active">Reset Password</div>
                    </div>
                    <div className="reset_box" id="reset-box" />
                    {hasPasswordChanged ? (
                        <div className="verify_box">
                            <img src={imgSuccess} className="verify_img" alt="success" />
                            Password successfully changed
                        </div>
                    ) : (
                        <form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                name="token"
                                value={token || ""}
                                ref={register(utilFormValidation.config.required)}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                name="password"
                                className="auth_input"
                                ref={register(utilFormValidation.config.password)}
                            />
                            <input
                                type="password"
                                placeholder="Repeat New Password"
                                name="passwordConfirm"
                                className="auth_input"
                                ref={register({
                                    required: true,
                                    validate: {
                                        confirm: (value) => value === watch("password"),
                                    },
                                })}
                            />
                            <button type="submit" className="auth_button">
                                SAVE
                            </button>
                        </form>
                    )}
                </div>
                <span onClick={() => close()} className="close-modal">
                    Close
                </span>
            </div>
        </div>
    );
};

const enhance = compose<any, any>(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export const ChangePasswordModal = enhance(ChangePasswordModalInner);
