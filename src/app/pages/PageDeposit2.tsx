import React from "react";
import Modal from "react-modal";
import {useHistory, useLocation} from "react-router-dom";

import {Transactions} from "../components/PageBalance/transactions";

import {IdCurrency} from "../api/constants/IdCurrency";
import FastAndEasy from "../../assets/images/fast-easy.png";
import Secure from "../../assets/images/secure.png";
import Convenient from "../../assets/images/convenient.png";
import Visa from "../../assets/images/MasterC.svg";
import MasterCard from "../../assets/images/VisaC.png";
import International from "../../assets/images/international.svg";
import {api} from "../../app/api/api";
import {withConsumer} from "../hoc/withConsumer";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {ICard} from "../api/models/ICards";
import {useUtilBrowser} from "../utils/UtilBrowserHook";
import Copy from "../../assets/images/copy2.png";
import Sepa from "./sepa";

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

const PageDepositView: React.FC<IConsumerAuth> = ({
    user: {
        data: {userCards, wallet, onfido_status},
        googleCaptcha,
    },
    deleteCard,
    setBalance,
    balance,
}) => {
    const location: any = useLocation();
    console.log(location);
    const [selectedCurrency, setSelectedCurrency] = React.useState<IdCurrency>(
        location.state?.active || IdCurrency.EUR,
    );
    const [amount, setAmount] = React.useState<number>(0);
    const [activeCardId, setActiveCardId] = React.useState<number>(-1);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [deleteCardFetching, setDeleteCardFetching] = React.useState<boolean>(false);

    const [depositFetching, setDepositFetching] = React.useState<boolean>(false);

    const [message, setMessage] = React.useState<string>("");
    const [depositMethod, setDepositMethod] = React.useState<string>("mastercard-or-visa");

    const [depositType, setDepositType] = React.useState<"currency" | "crypto">(
        location.state?.active === IdCurrency.BTC ? "crypto" : "currency",
    );
    const [copied, setCopied] = React.useState(false);
    const [copiedText, setCopiedText] = React.useState(false);

    const [commission] = React.useState(3.2);

    const commissionToAdd = React.useMemo(() => {
        if (isNaN(amount)) {
            return 0.0;
        }

        return ((commission / 100) * amount).toFixed(2);
    }, [commission, amount]);

    const isMobile = useUtilBrowser();

    const history = useHistory();

    const makeDeposit = () => {
        const activeCard = userCards.find((card) => card.id === activeCardId);
        if (activeCard === undefined) return;

        setShowModal(true);
        setDepositFetching(true);
        api.deposit(activeCard.cardNumber, amount, selectedCurrency).subscribe((response) => {
            if (response.action === "success") {
                setMessage("Deposit Successfully Created");
                setBalance(response.userBalances);
                // setBalance([
                //     {type: "EUR", balance: 160},
                //     {type: "BITCOIN", balance: 60},
                //     {type: "USD", balance: 60},
                // ]);
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

    const activeCurrency: any = history.location.state && history.location.state;

    const ref = React.useRef<HTMLInputElement>(null);

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
                {deleteCardFetching || depositFetching ? (
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
            <div className="PageDeposit-left d-flex flex-column">
                <div>
                    <span className="page_title1">Select currency and amount</span>
                    <div
                        className={`${
                            depositMethod === "international-bank" && depositType === "currency"
                                ? "PageDeposit-left_box disabled"
                                : "PageDeposit-left_box "
                        }`}
                    >
                        <div className="PageDeposit-left_box-input_box">
                            <label>{selectedCurrency}</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                        </div>
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
                                        setDepositType("crypto");
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
                            onClick={makeDeposit}
                            disabled={
                                depositType === "crypto" ||
                                activeCardId === -1 ||
                                amount === 0 ||
                                isNaN(amount) ||
                                balance[selectedCurrency === IdCurrency.USD ? "USD" : "EUR"].balance < amount
                            }
                        >
                            Deposit
                        </button>
                    </div>
                </div>
                {/* {depositType === "crypto" ? (
                    <div className="bitcoint-wallet-address-bg p-0 ">
                        <img
                            src={googleCaptcha}
                            width="150"
                            height="150"
                            alt="google captcha"
                            style={{border: "5px solid #006EDA", borderRadius: 10}}
                        />
                        <div className="bitcoint-wallet-address-bg-right">
                            <p style={{color: "#ffffff", fontSize: 22}}>Bitcoin wallet addresssss</p>
                            <div className="bitcoint-wallet-address-bg-right-copy-bg">
                                <span style={{color: "#ffffff", fontSize: 14, wordBreak: "break-all"}}>{wallet}</span>
                                <span
                                    className="bitcoint-wallet-address-bg-right-copy-bg-img"
                                    onClick={() => navigator.clipboard.writeText(wallet)}
                                >
                                    <img src={Copy} alt="copy" />
                                </span>
                            </div>
                        </div>
                    </div>
                ) : null} */}
            </div>

            <div className="PageDeposit-right">
                <span className="page_title1">
                    {depositType === "currency" ? "Choose deposit payment method" : "BTC deposit"}
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
                                <Sepa isverify={onfido_status === "APPLICANT_CONFIRMED"} />
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
                    <div style={{background: "#fff"}} className="PageDeposit-right-bitcoinDeposit ">
                        <div className="bitcoint-wallet-address-bg  mt-0  ">
                            <img
                                src={googleCaptcha}
                                width="150"
                                height="150"
                                alt="google captcha"
                                style={{border: "5px solid #006EDA", borderRadius: 10}}
                            />
                            <div className="bitcoint-wallet-address-bg-right">
                                <p style={{color: "#649cdd", fontSize: 22}}>Bitcoin wallet addres</p>
                                <div className="bitcoint-wallet-address-bg-right-copy-bg">
                                    <span style={{color:  copiedText ? "green" : "#649cdd", fontSize: 14, wordBreak: "break-all"}}>
                                        {wallet}
                                    </span>
                                    <span
                                        className={`${
                                            copied
                                                ? "bitcoint-wallet-address-bg-right-copy-bg-img animate__rubberBand"
                                                : "bitcoint-wallet-address-bg-right-copy-bg-img"
                                        }`}
                                        onClick={() => {

                                            navigator.clipboard.writeText(wallet);
                                            setCopied(true);
                                            setCopiedText(true)
                                            setTimeout(() => {
                                                setCopied(false);
                                            }, 1400);
                                        }}
                                    >
                                        <img src={Copy} alt="copy" />
                                    </span>
                                </div>
                                <p className="PageDeposit-right-bitcoinDeposit-description p-0">
                                    Minimum deposit amount is 0.001. If the amount is less than specified, the funds
                                    will not be credited to your Account. The funds will appear on your balance once the
                                    deposited amount exceeds specified minimum.
                                </p>
                            </div>
                        </div>
                        {/* <div className="PageDeposit-right-bitcoinDeposit-qr-box">
                            <p style={{color: "#A5A5A5"}}>Scan QR code</p>
                            <img
                                alt="google auth"
                                width="150"
                                src={googleCaptcha}
                                style={{border: "5px solid #006EDA", borderRadius: 5}}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                                marginTop: 30,
                                width: "100%",
                            }}
                        >
                            <p style={{color: "#A5A5A5", fontSize: 14, textAlign: "center"}}>
                                Or send funds to the address below
                            </p>
                            <p className="PageDeposit-right-bitcoinDeposit-wallet-address">{wallet}</p>
                            <div className="deposit_box1 deposit_box1-deposit">
                                <input
                                    type="text"
                                    className="deposit_input float-none"
                                    ref={ref}
                                    value={wallet}
                                    onChange={(event) => undefined}
                                />
                                <span>{wallet}</span>
                                <span
                                    className="bitcoint-wallet-address-bg-right-copy-bg-img"
                                    onClick={() => navigator.clipboard.writeText(wallet)}
                                >
                                    <img src={Copy} alt="copy" />
                                </span>
                            </div>
                        </div>
                        <p className="PageDeposit-right-bitcoinDeposit-description">
                            Minimum deposit amount is 0.0001. If the amount is less than specified, the funds will not
                            be credited to your Account. The funds will appear on your balance once the deposited amount
                            exceeds specified minimum.
                        </p> */}
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

export const PageDeposit = withConsumer(ConsumerAuth)(PageDepositView);
