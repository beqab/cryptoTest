import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../../auth/ConsumerAuth";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {compose} from "recompose";
import useForm from "react-hook-form";
import authpic from "../../../assets/images/auth.png";
import {utilFormValidation} from "../../utils/utilFormValidation";
import {withConsumer} from "../../hoc/withConsumer";

export interface ILoginModalProps extends IConsumerModal, IConsumerAuth {}

const Login2FaModalInner: React.FC<ILoginModalProps> = ({close, try2FaAuth}) => {
    const {register, handleSubmit, errors, setError, clearError} = useForm();

    const onSubmit = (data: any) => {
        clearError();
        try2FaAuth(
            data.code as string,
            (data) => {
                close();
            },
            (error) => {
                setError("code", "wrong", "Something went wrong");
            },
        );
    };

    return (
        <div className="blocker">
            <div id="ex1" className="modal position-relative">
                <div className="login_left hide_mob">
                    <div className="popup_app">
                        <div className="popup_apps">
                            <img className="authpic" src={authpic} alt="Google Authentificator" />
                        </div>
                        <span>Use your 2FA code to login</span>
                    </div>
                </div>

                <div className="login_right">
                    <div className="login_box1 pt-75">
                        <form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="text"
                                placeholder="Enter 2FA Code"
                                name="code"
                                className={`auth_input${errors.code ? " auth_input-error" : ""}`}
                                ref={register(utilFormValidation.config.required)}
                            />

                            <button type="submit" className="auth_button">
                                SIGN IN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const enhance = compose<any, any>(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export const Login2FaModal = enhance(Login2FaModalInner);
