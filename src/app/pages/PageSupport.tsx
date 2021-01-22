import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import Dropdown from "react-dropdown";
import {api} from "../api/api";
import useForm from "react-hook-form";
import {useState} from "react";
import {utilFormValidation} from "../utils/utilFormValidation";
import {withConsumer} from "../hoc/withConsumer";
import {toast} from "react-toastify";

export interface IPageSupportProps extends IConsumerAuth {}

const PageSupportInner: React.FC<IPageSupportProps> = ({
    user: {
        data: {firstname, lastname, username},
    },
}) => {
    const [subject, setSubject] = useState("Select");
    const [responseData, setResponseData] = useState<any>(null);
    const {errors, handleSubmit, register, reset} = useForm();

    const onSubmit = (data: any) => {
        api.contact(data, true).subscribe((response) => {
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
            toast.error("Something went wrong...");
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
                            <p>Out team will respond to you shortly</p>
                        </>
                    ) : (
                        <>
                            <h3>Could not send</h3>
                            <p>Please try again, sorry</p>
                        </>
                    )}
                </div>
            )}

            <div className="PageSupport">
                <div className="page_title1">Support</div>
                <div className="profile_box contact_box">
                    <form className="contact_form contact_box1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="contact_form-left">
                            <input type="hidden" name="subject" value={subject} ref={register} />
                            <Dropdown
                                options={["Select", "General inquiries", "Technical support", "Business inquiries"]}
                                value={"Select"}
                                className="Dropdown--wide Dropdown--support"
                                onChange={(option) => setSubject(option.value)}
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                name="title"
                                className={`contact_input${errors.title ? " auth_input-error" : ""}`}
                                value={`${firstname} ${lastname}`}
                                disabled
                                ref={register(utilFormValidation.config.required)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="from"
                                className={`contact_input${errors.from ? " auth_input-error" : ""}`}
                                value={username}
                                disabled
                                ref={register(utilFormValidation.config.email)}
                            />
                            <textarea
                                name="text"
                                className={`contact_input1${errors.text ? " auth_input-error" : ""}`}
                                placeholder="Text..."
                                ref={register(utilFormValidation.config.required)}
                            />
                            <button className="contact_send">SEND</button>
                        </div>
                    </form>
                    <div className="contact_info">
                        <div className="contact_info_item contact_mail1">
                            <span>Mail</span> support@cryptoiex.io
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const PageSupport = withConsumer(ConsumerAuth)(PageSupportInner);
