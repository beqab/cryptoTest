import * as React from "react";
import {api} from "../api/api";
import useForm from "react-hook-form";
import {utilFormValidation} from "../utils/utilFormValidation";
import {toast} from "react-toastify";

export interface IPageContactProps {}

export const PageContact: React.FC<IPageContactProps> = () => {
    const {errors, handleSubmit, register, reset} = useForm();
    const [responseData, setResponseData] = React.useState<any>(null);

    // TODO: not working without auth
    const onSubmit = (data: any) => {
        api.contact(data, false).subscribe((response) => {
            if (response.action === "success") {
                reset();
                setResponseData(response);
                setTimeout(() => {
                    setResponseData(null);
                }, 5000);
                return;
            }
            setResponseData(response);
            setTimeout(() => {
                setResponseData(null);
            }, 5000);
            toast("Something went wrong...");
        });
    };

    return (
        <>
            {responseData && (
                <div className="msgBox">
                    <div className="close-modal" onClick={() => setResponseData("")} />
                    <div className="iconBox">
                        <img
                            src={
                                responseData && responseData.action === "success"
                                    ? "https://i.imgur.com/rIfe0Hb.png"
                                    : "https://i.imgur.com/mRaIfK9.png"
                            }
                        />
                    </div>
                    {responseData && responseData.action === "success" ? (
                        <>
                            <h3>Your message was sent successfully</h3>
                            <p>Out team will respond to you shortly </p>
                        </>
                    ) : (
                        <>
                            <h3>Could not send</h3>
                            <p>Please try again, sorry</p>
                        </>
                    )}
                </div>
            )}

            <div className="PageContact">
                <div className="page_title1">Contact Us</div>
                <div className="contact_box">
                    <form className="contact_form contact_box1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="contact_form-left">
                            <input
                                type="text"
                                placeholder="Name"
                                name="title"
                                className={`contact_input${errors.title ? " auth_input-error" : ""}`}
                                ref={register(utilFormValidation.config.required)}
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                name="from"
                                className={`contact_input${errors.from ? " auth_input-error" : ""}`}
                                ref={register(utilFormValidation.config.email)}
                            />
                            <textarea
                                name="text"
                                className={`contact_input1${errors.text ? " auth_input-error" : ""}`}
                                placeholder="Message"
                                ref={register(utilFormValidation.config.required)}
                            />
                            <button className="contact_send">SEND</button>
                        </div>
                    </form>
                    <div className="contact_info">
                        <div className="contact_info_item contact_mail1">
                            <span>Mail</span> contact@cryptoiex.io
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
