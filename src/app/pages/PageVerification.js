import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {IdVerified} from "../api/IdVerified";
// import {VerificationForm} from "../verification/VerificationForm";
import imgSuccess from "../../assets/images/success.png";
import imgVerify from "../../assets/images/verify.png";
import {withConsumer} from "../hoc/withConsumer";
import useForm from "react-hook-form";
import {api} from "../api/api";
import {toast} from "react-toastify";
import imgIdCard from "../../assets/images/id-card.png";
import imgNewspaper from "../../assets/images/newspaper-folded.png";
import imgPic from "../../assets/images/image.png";
import {utilFormValidation} from "../utils/utilFormValidation";

// export interface IPageVerificationProps extends IConsumerAuth {}

const months = {
    January: 31,
    February: 29,
    March: 31,
    April: 30,
    May: 31,
    june: 30,
    july: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
};

// type Imonths = keyof typeof months;

//  getMonth

const PageVerificationInner = ({
    user: {
        data: {verified},
    },
    setVerified,
}) => {
    const {register, handleSubmit, errors} = useForm();
    const [countrys, setCountrys] = React.useState([]);

    // const refForm = useRef(null);
    const [pictureNames, setPictureNames] = React.useState({
        mainPicture: null,
        backPicture: null,
        pictureWithId: null,
        additionalPicture: null,
    });

    const onChange = (event) => {
        const name = event.currentTarget.name;
        const file = event.target.files[0];
        if (file !== null) {
            setPictureNames({
                ...pictureNames,
                [name]: file,
            });
        }
    };

    const [currentMonth, setCurrentMonth] = React.useState("");

    const getMonth = () => {
        return Object.keys(months).map((month, i) => {
            return (
                <option key={month} value={month}>
                    {month}
                </option>
            );
        });
    };

    const getDay = () => {
        let maxMonth = 31;
        if (currentMonth) {
            maxMonth = months[currentMonth];
        }
        const dayOptions = [];
        for (let index = 1; index <= maxMonth; index++) {
            dayOptions.push(<option value={index - 1}>{index}</option>);
        }
        return dayOptions;
    };

    const getYear = () => {
        const yearOptions = [];
        for (let index = 2020; index >= 1920; index--) {
            yearOptions.push(<option>{index}</option>);
        }
        return yearOptions;
    };

    const onSubmit = (userData) => {
        const formData = new FormData();
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

        const monthIndex = Object.keys(months).indexOf("April");

        const birthDate = new Date(Number(userData.year), Number(userData.day), Number(userData.day.month), monthIndex);

        const AdditionalData = {
            city: userData.city,
            zip: userData.zip,
            middleName: userData.middleName,
            country: userData.country,
            state: userData.state,
            street: userData.street,
            birthPlace: userData.birthPlace,
            birthDate: birthDate,
        };

        api.additionaldata(AdditionalData).subscribe((data) => {
            if (data.action === "success") {
                return setVerified(IdVerified.Pending);
            }

            toast.error("Something went wrong. Please, try again.");
        });
    };

    React.useEffect(() => {
        api.getCountrys().subscribe((response) => {
            setCountrys(response.data);
        });
    }, []);

    return (
        <div className="PageVerification">
            <form
                method="post"
                id="myform"
                className={`d-flex ${verified !== IdVerified.Unverified ? "m-auto" : ""} `}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className={`${
                        verified === IdVerified.Pending
                            ? "verificationLeft  verificationLeft-inProcess"
                            : "verificationLeft"
                    }`}
                >
                    <div className="page_title1">Verification</div>
                    <div className="profile_box newVerification">
                        <div className="profile_l1">
                            {verified === IdVerified.Pending && (
                                <div className="verify_box" style={{color: "#333", minWidth: 300}}>
                                    <img src={imgVerify} className="verify_img" alt="verify" />
                                    Verification in process. You will be notified on your verification status within 72
                                    hours
                                </div>
                            )}
                            {verified === IdVerified.Verified && (
                                <div className="verify_box" style={{color: "#333", minWidth: 300}}>
                                    <img src={imgSuccess} className="verify_img" alt="success" />
                                    Verification successfully completed
                                </div>
                            )}
                            {/* {verified === IdVerified.Unverified && <VerificationForm />} */}
                            {verified === IdVerified.Unverified && (
                                <div className="text-center">
                                    <div className="verify_item newStyle">
                                        <div
                                            // htmlFor="mainPicture"
                                            className={`verify_item-box ${
                                                errors.mainPicture && errors.mainPicture.type ? "hasError-border" : ""
                                            }`}
                                        >
                                            <div className="verify_pic">
                                                <img src={imgIdCard} alt="id card" />
                                            </div>
                                            <div className="clear" />
                                            <div className="verify_text pt-0">
                                                Please provide copies of front side of your card.
                                                {/* <div>
                                                    {(pictureNames.mainPicture && pictureNames.mainPicture.name) ||
                                                        null}
                                                </div> */}
                                            </div>
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
                                    <div className="verify_item newStyle">
                                        <div
                                            // htmlFor="backPicture"
                                            className={`verify_item-box ${
                                                errors.backPicture && errors.backPicture.type ? "hasError-border" : ""
                                            }`}
                                        >
                                            <div className="verify_pic">
                                                <img src={imgPic} alt="landscape" />
                                            </div>
                                            <div className="clear" />
                                            <div className="verify_text">
                                                Please provide copies of back side of your card.
                                                {/* <div>
                                                    {(pictureNames.backPicture && pictureNames.backPicture.name) ||
                                                        null}
                                                </div> */}
                                            </div>
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

                                    <div className="verify_item newStyle">
                                        <div
                                            // htmlFor="pictureWithId"
                                            className={`verify_item-box ${
                                                errors.pictureWithId && errors.pictureWithId.type
                                                    ? "hasError-border"
                                                    : ""
                                            }`}
                                        >
                                            <div className="verify_pic">
                                                <img src={imgPic} alt="landscape" />
                                            </div>
                                            <div className="clear" />
                                            <div className="verify_text">
                                                Please upload your picture with your id card.
                                                {/* <div>
                                                    {(pictureNames.pictureWithId && pictureNames.pictureWithId.name) ||
                                                        null}
                                                </div> */}
                                            </div>
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
                                    <div style={{marginBottom: "14px"}} className="verify_item newStyle">
                                        <div
                                            style={{minHeight: "144px"}}
                                            htmlFor="additionalPicture"
                                            className={`verify_item-box ${
                                                errors.additionalPicture && errors.additionalPicture.type
                                                    ? "hasError-border"
                                                    : ""
                                            }`}
                                        >
                                            <div className="verify_pic">
                                                <img src={imgNewspaper} alt="newspaper" />
                                            </div>
                                            <div className="clear" />
                                            <div className="verify_text pb-15">
                                                We accept utility and electricity bills, bank statements, tax return
                                                documents, and any other documents with your address as well as your
                                                first and last name
                                                {/* <div>
                                                    {(pictureNames.additionalPicture &&
                                                        pictureNames.additionalPicture.name) ||
                                                        null}
                                                </div> */}
                                            </div>
                                            <label htmlFor="additionalPicture" className="verify_upload">
                                                {!pictureNames.additionalPicture
                                                    ? "UPLOAD"
                                                    : pictureNames.additionalPicture &&
                                                      pictureNames.additionalPicture.name}
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
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {verified === IdVerified.Unverified && (
                    <div className="PageVerification_personalInfo-verification verificationRight">
                        <div className="page_title1">Personal Information</div>
                        <div className="h-100">
                            <div className="profile_box newVerification ">
                                {/* <div className="PageVerification_card-verification_choose">
                            <div className="PageVerification_card-verification_choose-mastercard">&nbsp;</div>
                            <div className="PageVerification_card-verification_choose-visa">&nbsp;</div>
                        </div> */}
                                <div method="post" className="personalInfo-verification-form">
                                    <div className="wrapper">
                                        <input
                                            name="middleName"
                                            placeholder="First and Last Name"
                                            className={`verification-input ${
                                                errors.middleName && errors.middleName.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.name)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.middleName && errors.middleName.type === "minLength"
                                                ? "middleName must be at least 4 characters in length"
                                                : "middleName is required"}
                                        </div>
                                    </div>

                                    <div
                                        className={`berthDeyGroup  ${
                                            errors.year && errors.year.type ? "hasError" : ""
                                        }`}
                                    >
                                        <div className="verification-input-errorText">
                                            {errors.year && errors.year.type === "notAdult"
                                                ? "You must be at least 18 years old"
                                                : "year is required"}
                                        </div>
                                        <select
                                            name="month"
                                            className={`verification-input month ${
                                                errors.month && errors.month.type ? "hasError" : ""
                                            }`}
                                            onChange={(e) => {
                                                setCurrentMonth(e.target.value);
                                            }}
                                            ref={register(utilFormValidation.config.month)}

                                            // onFocus={() => clearError("oldPassword")}
                                        >
                                            {/* <option selected className="d-none">
                                                month
                                            </option> */}
                                            {getMonth()}
                                            {/* <option value="dd">dd</option> */}
                                        </select>

                                        <select
                                            name="day"
                                            placeholder="day"
                                            className={`verification-input day ${
                                                errors.day && errors.day.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.required)}
                                            // onFocus={() => clearError("oldPassword")}
                                        >
                                            {getDay()}
                                        </select>
                                        <select
                                            name="year"
                                            placeholder="year"
                                            className={`verification-input Year ${
                                                errors.year && errors.year.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.year)}
                                            // onFocus={() => clearError("oldPassword")}
                                        >
                                            {getYear()}
                                        </select>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            name="birthPlace"
                                            placeholder="Birth Place"
                                            className={`verification-input ${
                                                errors.birthPlace && errors.birthPlace.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.name)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.birthPlace && errors.birthPlace.type === "minLength"
                                                ? "birthPlace must be at least 4 characters in length"
                                                : "birthPlace is required"}
                                        </div>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            type="number"
                                            name="phone"
                                            placeholder="Phone Number"
                                            className={`verification-input ${
                                                errors.phone && errors.phone.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.phone)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.phone && errors.phone.type === "minLength"
                                                ? "phone must be at least 9 characters in length"
                                                : "phone is required"}
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <select
                                            className="verification-input"
                                            name="country"
                                            ref={register(utilFormValidation.config.required)}
                                        >
                                            {countrys.map((country) => {
                                                return <option value={country.id}>{country.name}</option>;
                                            })}
                                        </select>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            name="state"
                                            placeholder="State/Province"
                                            className={`verification-input ${
                                                errors.state && errors.state.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.required)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.state && errors.state.type === "minLength"
                                                ? "state must be at least 9 characters in length"
                                                : "state is required"}
                                        </div>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            name="zip"
                                            placeholder="ZIP code"
                                            className={`verification-input ${
                                                errors.zip && errors.zip.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.required)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.zip && errors.zip.type === "minLength"
                                                ? "zip must be at least 9 characters in length"
                                                : "zip is required"}
                                        </div>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            name="city"
                                            placeholder="City"
                                            className={`verification-input ${
                                                errors.city && errors.city.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.required)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.city && errors.city.type === "minLength"
                                                ? "city must be at least 9 characters in length"
                                                : "city is required"}
                                        </div>
                                    </div>

                                    <div className="wrapper">
                                        <input
                                            name="street"
                                            placeholder="Street"
                                            className={`verification-input   mb-0 ${
                                                errors.street && errors.street.type ? "hasError" : ""
                                            }`}
                                            ref={register(utilFormValidation.config.required)}
                                        />
                                        <div className="verification-input-errorText">
                                            {errors.street && errors.street.type === "minLength"
                                                ? "street must be at least 9 characters in length"
                                                : "street is required"}
                                        </div>
                                    </div>

                                    <button type="submit" className="verify_button">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export const PageVerification = withConsumer(ConsumerAuth)(PageVerificationInner);
