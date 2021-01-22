import React from "react";

import {IdCurrency} from "../api/constants/IdCurrency";
import FastAndEasy from "../../assets/images/fast-easy.png";
import Secure from "../../assets/images/secure.png";
import Convenient from "../../assets/images/convenient.png";
import Visa from "../../assets/images/MasterC.svg";
import MasterCard from "../../assets/images/VisaC.png";
import International from "../../assets/images/international.svg";
import {useHistory, useLocation} from "react-router-dom";
import {api} from "../../app/api/api";
import {withConsumer} from "../hoc/withConsumer";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {ICard} from "../api/models/ICards";
import Modal from "react-modal";
import {useUtilBrowser} from "../utils/UtilBrowserHook";
import useForm from "react-hook-form";
import {utilFormValidation} from "../utils/utilFormValidation";
import BTCIcon from "../../assets/images/btc_yellow.svg";
import Sepa from "./sepaWithdraw";
import {Transactions} from "../components/PageBalance/transactions";

const CardTable: React.FC<{
    activeCardId: number;
    handleChangeActiveCard: (id: number) => void;
    cards: ICard[];
}> = ({activeCardId, handleChangeActiveCard, cards}) => {
    return (
        <div style={{overflowX: "auto", fontSize: 11, fontWeight: 500, paddingBottom: 20}}>
            <table style={{width: "100%"}} className="balance-table">
                <thead>
                    <tr style={{width: "100%"}}>
                        <th style={{minWidth: 50}}></th>
                        <th style={{minWidth: 70}}></th>
                        <th style={{minWidth: 180}}></th>
                        {/* <th style={{minWidth: 120, fontWeight: 500, textAlign: "left"}}>Status</th> */}
                        <th style={{minWidth: 150, fontWeight: 500, textAlign: "left"}}></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{fontSize: "15px"}}>
                    {cards.map((card) => (
                        <tr style={{minHeight: "40px"}} key={card.id}>
                            <td>
                                <input
                                    type="radio"
                                    checked={activeCardId === card.id}
                                    onChange={() => handleChangeActiveCard(card.id)}
                                />
                            </td>
                            <td>
                                {/^5[1-5][0-9]{14}$/.test(card.cardNumber) ? (
                                    <div style={{width: "50px"}} className="text-center">
                                        <img width="41" style={{transform: "translateY(3px)"}} src={MasterCard} />
                                    </div>
                                ) : (
                                    <div style={{width: "50px"}} className="text-center">
                                        <img width="50" style={{transform: "translateY(2px)"}} src={Visa} />
                                    </div>
                                )}
                            </td>
                            <td>{card.cardNumber}</td>
                            {/* <td>
                                <span style={{backgroundColor: "#E51E3F", padding: "5px 20px 5px 20px", borderRadius: 5, color: "#fff", fontSize: 11}}>Expired</span>
                            </td> */}
                            <td>{card.cardHolderName}</td>
                            <td>{card.expired}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PageWithdrawView: React.FC<IConsumerAuth> = ({
    user: {
        data: {userCards, wallet, onfido_status},
    },
    deleteCard,
    setBalance,
    balance,
}) => {
    const [depositMethod, setDepositMethod] = React.useState<string>("");

    const location: any = useLocation();
    const [selectedCurrency, setSelectedCurrency] = React.useState<IdCurrency>(
        location.state?.active || IdCurrency.EUR,
    );
    const [amount, setAmount] = React.useState<number>(0);
    const [activeCardId, setActiveCardId] = React.useState<number>(-1);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [deleteCardFetching, setDeleteCardFetching] = React.useState<boolean>(false);

    const [depositFetching, setDepositFetching] = React.useState<boolean>(false);

    const [message, setMessage] = React.useState<string>("");

    const [depositType, setDepositType] = React.useState<"currency" | "crypto">(
        location.state?.active === IdCurrency.BTC ? "crypto" : "currency",
    );

    const [commission] = React.useState(3.2);

    const [sendBtcFetching, setSendBtcFetching] = React.useState<boolean>(false);
    const {errors, handleSubmit, register} = useForm({
        defaultValues: {
            amount: 0,
            to: "",
        },
    });

    const handleSendBtc = (data: any) => {
        setSendBtcFetching(true);
        setShowModal(true);
        api.sendBtc(data.to, data.amount).subscribe((response) => {
            if (response.action === "success") {
                setMessage("Withdraw Successfully created");
            } else {
                setMessage("Something went wrong");
            }
            setSendBtcFetching(false);
        });
    };

    const commissionToAdd = React.useMemo(() => {
        if (isNaN(amount)) {
            return 0.0;
        }

        return ((commission / 100) * amount).toFixed(2);
    }, [commission, amount]);

    const isMobile = useUtilBrowser();

    const history = useHistory();

    const makeWithdraw = () => {
        const activeCard = userCards.find((card) => card.id === activeCardId);
        if (activeCard === undefined) return;

        setShowModal(true);
        setDepositFetching(true);
        api.withdraw(activeCard.cardNumber, amount, selectedCurrency).subscribe((response) => {
            if (response.action === "success") {
                setMessage("Withdraw Successfully Created");
                setBalance(response.userBalances);
            } else {
                setMessage("Something Went Wrong");
            }
            setDepositFetching(false);
        });
    };

    const handleDeleteCard = () => {
        const activeCard = userCards.find((card) => card.id === activeCardId);
        if (activeCard === undefined) return;

        setShowModal(true);
        setDeleteCardFetching(true);

        api.deleteCard({cardNumber: activeCard.cardNumber}).subscribe((response) => {
            if (response.action === "success") {
                setMessage("Card Successfully Deleted");
                deleteCard(activeCardId);
            } else {
                setMessage("Something Went Wrong");
            }
            setDeleteCardFetching(false);
            setActiveCardId(-1);
        });
    };

    return (
        <div className="PageDeposit">
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
                {deleteCardFetching || depositFetching || sendBtcFetching ? (
                    <p>Loading ...</p>
                ) : (
                    <>
                        <p style={{color: "#006EDA"}}>{message}</p>
                        <button
                            className="sell_button"
                            style={{maxWidth: 230}}
                            onClick={() => {
                                setDeleteCardFetching(false);
                                setDepositFetching(false);
                                setShowModal(false);
                            }}
                        >
                            Done
                        </button>
                    </>
                )}
            </Modal>
            <div className="PageDeposit-left">
                <span className="page_title1">Select currency and amount</span>
                <div className="PageDeposit-left_box">
                    <div
                        className="PageDeposit-left_box-input_box"
                        style={
                            balance[selectedCurrency === IdCurrency.USD ? "USD" : "EUR"].balance < amount
                                ? {
                                      backgroundColor: "red",
                                  }
                                : {}
                        }
                    >
                        <label>{selectedCurrency}</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            readOnly={depositType === "crypto"}
                        />
                    </div>
                    <p>
                        {balance[selectedCurrency === IdCurrency.USD ? "USD" : "EUR"].balance < amount
                            ? "Error message"
                            : ""}
                    </p>
                    <div className="PageDeposit-left_box-choose-currency_box">
                        <ul>
                            {/*
                            <li
                                className={`${selectedCurrency === IdCurrency.USD ? "active" : "" }`}
                                onClick={() => {
                                    setSelectedCurrency(IdCurrency.USD);
                                    setDepositType('currency');
                                }}
                            >
                                USD
                            </li>
                        */}

                            <li
                                className={`${selectedCurrency === IdCurrency.EUR ? "active" : ""}`}
                                onClick={() => {
                                    setSelectedCurrency(IdCurrency.EUR);
                                    setDepositType("currency");
                                }}
                            >
                                EUR
                            </li>
                            <li
                                className={`${selectedCurrency === IdCurrency.BTC ? "active" : ""}`}
                                onClick={() => {
                                    setSelectedCurrency(IdCurrency.BTC);
                                    console.log(IdCurrency.BTC);
                                    setDepositType("crypto");
                                    setAmount(0);
                                }}
                            >
                                BTC
                            </li>
                        </ul>
                    </div>
                    <hr color="#006EDA" style={{height: 1, border: "none"}} />
                    <div className="PageDeposit-left_box-comission-amount_box">
                        <span>{`Commission ${commission} %`}</span>
                        <span>{commissionToAdd}</span>
                    </div>
                    <hr color="#006EDA" style={{height: 1, border: "none"}} />
                    <div className="PageDeposit-left_box-comission-amount_box" style={{fontSize: 14}}>
                        <span>
                            <b>Total Amount:</b>
                        </span>
                        <span>
                            <b>{(+commissionToAdd + amount).toFixed(2)}</b>
                        </span>
                    </div>
                    <button
                        className="sell_button"
                        onClick={makeWithdraw}
                        disabled={
                            (depositType !== "crypto" && activeCardId === -1) ||
                            amount === 0 ||
                            isNaN(amount) ||
                            balance[selectedCurrency === IdCurrency.USD ? "USD" : "EUR"].balance < amount
                        }
                    >
                        Withdraw
                    </button>
                </div>
            </div>
            <div className="PageDeposit-right">
                <span className="page_title1">
                    {depositType === "currency" ? "Choose Payment Method" : "BTC withdraw"}
                </span>
                {depositType === "currency" ? (
                    <>
                        <div className="PageDeposit-right_box">
                            <div
                                className={`PageDeposit-right_box-visa-and-mastercard ${
                                    depositMethod === "mastercard-or-visa"
                                        ? "PageDeposit-right_box-visa-and-mastercard-active"
                                        : ""
                                }`}
                                onClick={() => setDepositMethod("mastercard-or-visa")}
                            >
                                <div
                                    style={{display: "flex", alignItems: "self-end", marginTop: "20px"}}
                                    className="text-center"
                                >
                                    <img className="ml-10 visa" src={Visa} alt="" />
                                    <img
                                        style={{
                                            width: "59px",
                                            marginTop: "5px",
                                            marginLeft: "11px",
                                            height: "42px",
                                        }}
                                        className="MasterCard"
                                        src={MasterCard}
                                        alt=""
                                    />
                                </div>
                                <div style={{display: "flex"}}>
                                    <span style={{color: "#929292"}}>Pay via</span>
                                    <span style={{color: "#006eda"}}>&nbsp; Card</span>
                                </div>
                            </div>
                            <div
                                className={`PageDeposit-right_box-international-bank ${
                                    depositMethod === "international-bank"
                                        ? "PageDeposit-right_box-international-bank-active"
                                        : ""
                                }`}
                                onClick={() => setDepositMethod("international-bank")}
                            >
                                <div className="sepaImg">
                                    <img style={{marginTop: "24px", maxHeight: "48px"}} src={International} alt="" />
                                </div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <span style={{color: "#929292"}}>Pay via</span>
                                    <span style={{color: "#006eda"}}>&nbsp;SEPA</span>
                                </div>
                            </div>
                        </div>

                        {depositMethod === "international-bank" ? (
                            <div className="PageDeposit-right_box-cards">
                                <Sepa isVerify={onfido_status === "APPLICANT_CONFIRMED"} />
                            </div>
                        ) : (
                            <div className="PageDeposit-right_box-cards">
                                {userCards.length === 0 ? (
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <p style={{fontSize: 22, color: "#000000"}}>You have no cards yet</p>
                                        <p style={{fontSize: 16, color: "#999999"}}>
                                            Add a payment card and make a deposit in a few clicks.
                                        </p>
                                    </div>
                                ) : (
                                    <CardTable
                                        activeCardId={activeCardId}
                                        handleChangeActiveCard={(id) => {
                                            setActiveCardId(id);
                                        }}
                                        cards={userCards}
                                    />
                                )}
                                <div className="PageDeposit-right_box-cards-buttons">
                                    <button
                                        className="PageDeposit-right_box-cards-buttons-new sell_button"
                                        onClick={() => history.push("/create-card")}
                                    >
                                        Add New Card
                                    </button>
                                    <button
                                        onClick={handleDeleteCard}
                                        disabled={activeCardId === -1}
                                        className={`sell_button PageDeposit-right_box-cards-buttons-remove ${
                                            activeCardId > -1 ? "PageDeposit-right_box-cards-buttons-remove-active" : ""
                                        }`}
                                    >
                                        Remove Card
                                    </button>
                                </div>
                                <div className="PageDeposit-right_box-cards-texts">
                                    <div className="PageDeposit-right_box-cards-texts-each">
                                        <span className="PageDeposit-right_box-cards-texts-each-icon">
                                            <img src={FastAndEasy} alt="" />
                                        </span>
                                        <div className="PageDeposit-right_box-cards-texts-each-box">
                                            <span className="PageDeposit-right_box-cards-texts-each-box-title">
                                                Fast & Easy
                                            </span>
                                            <span className="PageDeposit-right_box-cards-texts-each-box-description">
                                                Our payment card verification usually takes less than an hour
                                            </span>
                                        </div>
                                    </div>
                                    <div className="PageDeposit-right_box-cards-texts-each">
                                        <span className="PageDeposit-right_box-cards-texts-each-icon">
                                            <img src={Secure} alt="" />
                                        </span>
                                        <div className="PageDeposit-right_box-cards-texts-each-box">
                                            <span className="PageDeposit-right_box-cards-texts-each-box-title">
                                                Secure
                                            </span>
                                            <span className="PageDeposit-right_box-cards-texts-each-box-description">
                                                We comply with PCI DSS when storing, processing and transmitting
                                                cardholder data
                                            </span>
                                        </div>
                                    </div>
                                    <div className="PageDeposit-right_box-cards-texts-each">
                                        <span className="PageDeposit-right_box-cards-texts-each-icon">
                                            <img src={Convenient} alt="" />
                                        </span>
                                        <div className="PageDeposit-right_box-cards-texts-each-box">
                                            <span className="PageDeposit-right_box-cards-texts-each-box-title">
                                                Convenient
                                            </span>
                                            <span className="PageDeposit-right_box-cards-texts-each-box-description">
                                                After successful card verification, you will be able to add funds in a
                                                few clicks
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                       
                    </>
                ) : (
                    <>
                    <div className="PageDeposit-right-bitcoinDeposit BTCWithdraw">
                        <div style={{width: 70, height: 70, borderRadius: 140, marginTop: 20}}>
                            {/* <img src={BTCIcon} alt="" width={35} height={55} style={{margin: 40, marginLeft: 50}} /> */}
                            <span
                                style={{width: 70, height: 70}}
                                className="balance-table-icon balance-table-icon-btc"
                            />
                        </div>
                        <div style={{marginTop: 20}}>
                            <span style={{fontWeight: 500}}>Your Balance: </span>
                            <span style={{color: "#006EDA"}}>{balance["BITCOIN"].balance} </span>
                        </div>
                        <form style={{maxWidth: 500, marginTop: 20}} onSubmit={handleSubmit(handleSendBtc)}>
                            <input
                                type="text"
                                placeholder="Bitcoin address"
                                ref={register(utilFormValidation.config.required)}
                                name="to"
                                style={{
                                    marginTop: 5,
                                    fontWeight: 700,
                                    boxSizing: "border-box",
                                    minWidth: "100%",
                                    border: `2px solid ${errors.to ? "red" : "#006EDA"}`,
                                    borderRadius: 5,
                                    padding: "15px 30px",
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Amount to send"
                                ref={register(utilFormValidation.config.required)}
                                name="amount"
                                step="any"
                                style={{
                                    marginTop: 20,
                                    fontWeight: 700,
                                    boxSizing: "border-box",
                                    minWidth: "100%",
                                    border: `2px solid ${errors.amount ? "red" : "#006EDA"}`,
                                    borderRadius: 5,
                                    padding: "15px 30px",
                                }}
                            />
                            <button type="submit" className="sell_button">
                                Send
                            </button>
                        </form>
                    </div>
                    <div className="deposit-transactions">
                            <Transactions />
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export const PageWithdraw = withConsumer(ConsumerAuth)(PageWithdrawView);
