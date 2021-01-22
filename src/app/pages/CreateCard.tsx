import React, {useState} from "react";
import {RouterProps} from "react-router";
import Modal from "react-modal";
import useForm from "react-hook-form";
import {RHFInput} from "react-hook-form-input";

import Visa from "../../assets/images/visa2.png";
import MasterCard from "../../assets/images/mastercard2.png";
import NumberFormat from "react-number-format";
import {useUtilBrowser} from "../utils/UtilBrowserHook";
import {api} from "../../app/api/api";
import {withConsumer} from "../hoc/withConsumer";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {IdPath} from "../router/IdPath";

export interface IPageCreateCardView extends RouterProps, IConsumerAuth {}

const PageCreateCardView: React.FC<IPageCreateCardView> = ({addCard, history}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [createCardStatus, setCreateCardStatus] = useState<boolean>(false);
    const [createCardFetching, setCreateCardFetching] = useState<boolean>(false);
    const {errors, handleSubmit, register, setValue} = useForm();
    const isMobile = useUtilBrowser();

    const onSubmit = (data: any) => {
        setCreateCardFetching(true);
        setShowModal(true);
        api.createCard(data).subscribe((response) => {
            setCreateCardStatus(response.action === "success");
            if (response.action === "success") {
                addCard(response.data);
            }
            setCreateCardFetching(false);
        });
    };

    return (
        <div className="PageCreateCard">
            <Modal
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    content: {
                        maxWidth: isMobile ? "75%" : 700,
                        width: "100%",
                        borderRadius: 15,
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    },
                }}
            >
                {createCardFetching ? (
                    <p>Loading ...</p>
                ) : (
                    <>
                        <p style={{color: "#006EDA"}}>
                            {createCardStatus ? (
                                <div className="text-center">
                                    Payment Card Successfully Added <br />
                                    Now you can use it to make deposits, withdrawals, and buying crypto just in a few
                                    clicks.
                                </div>
                            ) : (
                                "Something went wrong"
                            )}
                        </p>
                        <button
                            className="sell_button"
                            style={{maxWidth: 230}}
                            onClick={() => {
                                setCreateCardFetching(false);
                                setCreateCardStatus(false);
                                setShowModal(false);
                                history.push(IdPath.Deposit);
                            }}
                        >
                            Done
                        </button>
                    </>
                )}
            </Modal>
            <span className="PageCreateCard-title">Manage your payment cards</span>
            <span className="PageCreateCard-title2">
                Provide information about your card. You can use any Visa/MasterCard issued in any currency
            </span>

            <div className="PageCreateCard-box">
                <div>
                    <img src={Visa} alt="" />
                    <img src={MasterCard} alt="" />
                </div>
                <div style={{width: "100%", marginTop: 20}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <RHFInput
                            as={
                                <NumberFormat
                                    type="text"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    format="#### #### #### ####"
                                    mask="_"
                                    id="cardNumber"
                                    style={{
                                        marginTop: 5,
                                        fontWeight: 700,
                                        boxSizing: "border-box",
                                        minWidth: "100%",
                                        border: `2px solid ${errors.cardNumber ? "red" : "#006EDA"}`,
                                        borderRadius: 5,
                                        padding: "15px 30px",
                                    }}
                                />
                            }
                            rules={{required: true, minLength: 16, maxLength: 16}}
                            register={register}
                            name="cardNumber"
                            setValue={setValue}
                            onChangeName="onValueChange"
                            onChangeEvent={(e) => {
                                return {
                                    value: e[0].value,
                                };
                            }}
                        />
                        <div style={{marginTop: 20}}>
                            <label htmlFor="cardHolderName">Card holder name</label>
                            <RHFInput
                                as={
                                    <input
                                        type="text"
                                        style={{
                                            marginTop: 5,
                                            fontWeight: 700,
                                            boxSizing: "border-box",
                                            minWidth: "100%",
                                            border: `2px solid ${errors.cardHolderName ? "red" : "#006EDA"}`,
                                            borderRadius: 5,
                                            padding: "15px 30px",
                                        }}
                                    />
                                }
                                rules={{required: true}}
                                register={register}
                                name="cardHolderName"
                                setValue={setValue}
                                onChangeName="onChange"
                                onChangeEvent={(e) => {
                                    return {
                                        value: e[0].target.value.toUpperCase(),
                                    };
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: "100%",
                                marginTop: 20,
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <label htmlFor="cardHolderName">Expiry Date</label>
                                <RHFInput
                                    as={
                                        <NumberFormat
                                            format="##/##"
                                            placeholder="MM/YY"
                                            mask={["M", "M", "Y", "Y"]}
                                            style={{
                                                marginTop: 5,
                                                fontWeight: 700,
                                                boxSizing: "border-box",
                                                width: "100%",
                                                border: `2px solid ${errors.expired ? "red" : "#006EDA"}`,
                                                borderRadius: 5,
                                                padding: "15px 30px",
                                            }}
                                        />
                                    }
                                    rules={{required: true}}
                                    register={register}
                                    name="expired"
                                    setValue={setValue}
                                    onChangeName="onValueChange"
                                    onChangeEvent={(e) => ({
                                        value: e[0].value,
                                    })}
                                />
                            </div>
                            <div style={{marginLeft: !isMobile ? 20 : 0}}>
                                <label htmlFor="cardHolderName">CCV</label>
                                <RHFInput
                                    as={
                                        <NumberFormat
                                            format="###"
                                            placeholder="XXX"
                                            style={{
                                                marginTop: 5,
                                                fontWeight: 700,
                                                boxSizing: "border-box",
                                                width: "100%",
                                                border: `2px solid ${errors.ccv ? "red" : "#006EDA"}`,
                                                borderRadius: 5,
                                                padding: "15px 30px",
                                            }}
                                        />
                                    }
                                    rules={{required: true}}
                                    register={register}
                                    name="ccv"
                                    setValue={setValue}
                                    onChangeName="onValueChange"
                                    onChangeEvent={(e) => ({
                                        value: e[0].value,
                                    })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="sell_button" style={{maxWidth: 700}}>
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const PageCreateCard = withConsumer(ConsumerAuth)(PageCreateCardView);
