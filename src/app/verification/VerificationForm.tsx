import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {FormEvent, useRef, useState} from "react";
import {IRequestVerification} from "../api/models/request/IRequestVerification";
import {IdVerified} from "../api/IdVerified";
import {api} from "../api/api";
import imgIdCard from "../../assets/images/id-card.png";
import imgNewspaper from "../../assets/images/newspaper-folded.png";
import imgPic from "../../assets/images/image.png";
import useForm from "react-hook-form";
import {utilFormValidation} from "../utils/utilFormValidation";
import {withConsumer} from "../hoc/withConsumer";
import {toast} from "react-toastify";

interface IVerificationFormProps extends IConsumerAuth {}

const VerificationFormInner: React.FC<IVerificationFormProps> = ({setVerified}) => {
    const {register, handleSubmit, errors} = useForm();
    const refForm = useRef<HTMLFormElement>(null);
    const [pictureNames, setPictureNames] = useState<any>({
        mainPicture: null,
        backPicture: null,
        pictureWithId: null,
        additionalPicture: null,
    });

    const onSubmit = () => {
        let formData = new FormData();
        formData.append("mainPicture", pictureNames.mainPicture);
        formData.append("backPicture", pictureNames.backPicture);
        formData.append("pictureWithId", pictureNames.pictureWithId);
        formData.append("additionalPicture", pictureNames.additionalPicture);

        api.verification(formData).subscribe((data) => {
            if (data.action === "success") {
                return setVerified(IdVerified.Pending);
            }

            toast.error("Something went wrong. Please, try again.");
        });
    };

    const onChange = (event: any) => {
        if (refForm.current) {
            const name = (event.currentTarget as any).name;
            const file = event.target.files[0];
            if (file !== null) {
                setPictureNames({
                    ...pictureNames,
                    [name]: file,
                });
            }
        }
    };

    console.log(errors, "render");

    return (
        <form method="post" ref={refForm} onSubmit={handleSubmit(onSubmit)}>
            <div className="verify_item">
                <div
                    className={`verify_item-box ${
                        errors.mainPicture && errors.mainPicture.type ? "hasError-border" : ""
                    }`}
                >
                    <div className="verify_pic">
                        <img src={imgIdCard} alt="id card" />
                    </div>
                    <div className="clear" />
                    <div className="verify_text">Please provide copies of front side of your card.</div>
                    <label htmlFor="mainPicture" className="verify_upload">
                        {!pictureNames.mainPicture
                            ? "UPLOAD"
                            : pictureNames.mainPicture && pictureNames.mainPicture.name}
                    </label>
                    <input
                        id="mainPicture"
                        type="file"
                        className="d-none"
                        name="mainPicture"
                        ref={register(utilFormValidation.config.required)}
                        onChange={onChange}
                    />
                    <div className="file-name" />
                </div>
            </div>
            <div className="verify_item">
                <div
                    className={`verify_item-box ${
                        errors.backPicture && errors.backPicture.type ? "hasError-border" : ""
                    }`}
                >
                    <div className="verify_pic">
                        <img src={imgPic} alt="landscape" />
                    </div>
                    <div className="clear" />
                    <div className="verify_text">Please provide copies of back side of your card.</div>
                    <label htmlFor="backPicture" className="verify_upload">
                        {!pictureNames.backPicture
                            ? "UPLOAD"
                            : pictureNames.backPicture && pictureNames.backPicture.name}
                    </label>
                    <input
                        id="backPicture"
                        type="file"
                        className="d-none"
                        name="backPicture"
                        ref={register(utilFormValidation.config.required)}
                        onChange={onChange}
                    />
                    <div className="file-name" />
                </div>
            </div>

            <div className="verify_item">
                <div
                    className={`verify_item-box ${
                        errors.pictureWithId && errors.pictureWithId.type ? "hasError-border" : ""
                    }`}
                >
                    <div className="verify_pic">
                        <img src={imgPic} alt="landscape" />
                    </div>
                    <div className="clear" />
                    <div className="verify_text">Please upload your picture with your id card.</div>
                    <label htmlFor="pictureWithId" className="verify_upload">
                        {!pictureNames.pictureWithId
                            ? "UPLOAD"
                            : pictureNames.pictureWithId && pictureNames.pictureWithId.name}
                    </label>
                    <input
                        id="pictureWithId"
                        type="file"
                        className="d-none"
                        name="pictureWithId"
                        ref={register(utilFormValidation.config.required)}
                        onChange={onChange}
                    />
                    <div className="file-name" />
                </div>
            </div>
            <div className="verify_item">
                <div
                    className={`verify_item-box ${
                        errors.additionalPicture && errors.additionalPicture.type ? "hasError-border" : ""
                    }`}
                >
                    <div className="verify_pic">
                        <img src={imgNewspaper} alt="newspaper" />
                    </div>
                    <div className="clear" />
                    <div className="verify_text">
                        We accept utility and electricity bills, bank statements, tax return documents, and any other
                        documents with your address as well as your first and last name
                    </div>
                    <label htmlFor="additionalPicture" className="verify_upload">
                        {!pictureNames.additionalPicture
                            ? "UPLOAD"
                            : pictureNames.additionalPicture && pictureNames.additionalPicture.name}
                    </label>
                    <input
                        id="additionalPicture"
                        type="file"
                        className="d-none"
                        name="additionalPicture"
                        ref={register(utilFormValidation.config.required)}
                        onChange={onChange}
                    />
                    <div className="file-name" />
                </div>
            </div>
            <button type="submit" className="verify_button">
                Send
            </button>
        </form>
    );
};

export const VerificationForm = withConsumer(ConsumerAuth)(VerificationFormInner);
