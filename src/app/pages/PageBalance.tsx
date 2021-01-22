import React from "react";
import {Balance} from "../components/PageBalance/balance";
import {Transactions} from "../components/PageBalance/transactions";
import Limits from "../components/PageBalance/limits";
import {withConsumer} from "../hoc/withConsumer";
import {IConsumerAuth, ConsumerAuth} from "../auth/ConsumerAuth";
import Modal from "react-modal";
import {useUtilBrowser} from "../utils/UtilBrowserHook";
import BTCIcon from "../../assets/images/btc_yellow.svg";
import useForm from "react-hook-form";
import {utilFormValidation} from "../utils/utilFormValidation";
import {api} from "../../app/api/api";

type IMenuItem = "Balance" | "Transactions" | "Payments" | "Limits and Commissions";

const menuItems: IMenuItem[] = ["Balance", "Transactions", "Payments", "Limits and Commissions"];

const PageBalanceView: React.FC<IConsumerAuth> = ({balance}) => {
    const [activeMenu, setActiveMenu] = React.useState<IMenuItem>("Balance");
    const [openBitconWithdrawModal, setOpenBitconWithdrawModal] = React.useState<boolean>(false);
    const [sendBtcFetching, setSendBtcFetching] = React.useState<boolean>(false);
    const [sendBtcAnswerReceived, setSendBtcAnswerReceived] = React.useState<boolean>(false);
    const [sendBtcStatus, setSendBtcStatus] = React.useState<boolean>(false);

    const isMobile = useUtilBrowser();
    const {errors, handleSubmit, register} = useForm();

    const handleSendBtc = (data: any) => {
        setSendBtcFetching(true);
        api.sendBtc(data.to, data.amount).subscribe((response) => {
            setSendBtcAnswerReceived(true);
            setSendBtcStatus(response.action === "success");
            setSendBtcFetching(false);
        });
    };

    const handleWithdrawBitcoinRequest = () => {
        setOpenBitconWithdrawModal(true);
    };

    return (
        <div className="PageBalance">
            <Modal
                ariaHideApp={false}
                isOpen={openBitconWithdrawModal}
                onRequestClose={() => setOpenBitconWithdrawModal(false)}
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
                {sendBtcFetching ? (
                    <p>Loading ...</p>
                ) : sendBtcAnswerReceived ? (
                    <>
                        <span>{sendBtcStatus ? "Successfully sent" : "Something went wrong"}</span>
                        <button
                            className="sell_button"
                            onClick={() => {
                                setSendBtcAnswerReceived(false);
                                setSendBtcStatus(false);
                                setOpenBitconWithdrawModal(false);
                            }}
                        >
                            Done
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{width: 140, height: 140, backgroundColor: "#F8EEAC", borderRadius: 140}}>
                            <img src={BTCIcon} alt="" width={35} height={55} style={{margin: 40, marginLeft: 50}} />
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
                                style={{
                                    marginTop: 20,
                                    fontWeight: 700,
                                    boxSizing: "border-box",
                                    minWidth: "100%",
                                    border: `2px solid ${errors.to ? "red" : "#006EDA"}`,
                                    borderRadius: 5,
                                    padding: "15px 30px",
                                }}
                            />
                            <button type="submit" className="sell_button">
                                Send
                            </button>
                        </form>
                    </>
                )}
            </Modal>
            <div className="PageBalance-menu">
                <ul className="PageBalance-menu-ul">
                    {menuItems.map((menu) => (
                        <li
                            onClick={() => setActiveMenu(menu)}
                            className={`PageBalance-menu-ul-li ${
                                activeMenu === menu ? "PageBalance-menu-ul-li-active" : ""
                            }`}
                        >
                            {menu}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="PageBalance-table-box">
                {activeMenu === "Balance" && (
                    <Balance balance={balance} handleWithdrawBitcoinRequest={handleWithdrawBitcoinRequest} />
                )}
                {activeMenu === "Transactions" && <Transactions />}
                {activeMenu === "Limits and Commissions" && <Limits />}
            </div>
        </div>
    );
};

export const PageBalance = withConsumer(ConsumerAuth)(PageBalanceView);
