import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import USDIcon from "../../../assets/images/usd_green.svg";
// import BTCIcon from "../../../assets/images/btc_yellow.svg";
// import EURIcon from "../../../assets/images/eur.svg";
import DepositIcon from "../../../assets/images/deposit_icon.png";
import WithdrawIcon from "../../../assets/images/deposit_icon.png";
import {IdCurrency} from "../../api/constants/IdCurrency";

export const Balance: React.FC<any> = ({balance, handleWithdrawBitcoinRequest}) => {
    const history = useHistory();

    return (
        <div style={{overflowX: "auto"}}>
            <table className="balance-table">
                <tr style={{width: "100%"}}>
                    <th style={{minWidth: 270, color: "#000000", fontSize: 24}}>Currency</th>
                    <th style={{minWidth: 200}}>Amount</th>
                    <th></th>
                    <th></th>
                </tr>
                {/* 
                <tr>
                    <td style={{display: "flex"}}>
                        <span
                            style={{
                                background: "rgba(68, 254, 54, 0.3)",
                                borderRadius: 10,
                                width: 30,
                                height: 30,
                                padding: 10,
                                marginTop: -13
                            }}
                        >
                            <img src={USDIcon} alt="usd" style={{marginLeft: 5}} />
                        </span>
                        
                        <span style={{marginLeft: 20}}>USD</span>
                    </td>
                    <td>{balance["USD"].balance}</td>
                    <td style={{width: 120}}>
                        <button style={{cursor: "pointer", display: "flex"}} onClick={() => history.push('/wallet', { active: IdCurrency.USD })}>
                            <img src={DepositIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Deposit</span>
                        </button>
                    </td>
                    <td style={{width: 120}}>
                        <button style={{cursor: "pointer", display: "flex"}} onClick={() => history.push('/withdraw', { active: IdCurrency.USD })}>
                            <img src={WithdrawIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Withdraw</span>
                        </button>
                    </td>
                </tr>
                */}
                <tr>
                    <td className="d-flex align-center align-items-center">
                        <span className="balance-table-icon balance-table-icon-eur"></span>

                        <span className="ml-20">EUR</span>
                    </td>
                    <td>{balance["EUR"].balance}</td>
                    <td style={{width: 120}}>
                        <button
                            style={{cursor: "pointer", display: "flex", width: "144px"}}
                            onClick={() => history.push("/wallet", {active: IdCurrency.EUR})}
                        >
                            <img src={DepositIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Deposit</span>
                        </button>
                    </td>
                    <td style={{width: 120}}>
                        <button
                            style={{cursor: "pointer", display: "flex"}}
                            onClick={() => history.push("/withdraw", {active: IdCurrency.EUR})}
                        >
                            <img src={WithdrawIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Withdraw</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className="d-flex align-center align-items-center">
                        <span className="balance-table-icon balance-table-icon-btc"></span>

                        <span className="ml-20">BTC</span>
                    </td>
                    <td>{balance["BITCOIN"].balance}</td>
                    <td style={{width: 120}}>
                        <button
                            style={{cursor: "pointer", display: "flex", width: "144px"}}
                            onClick={() => history.push("/wallet", {active: IdCurrency.BTC})}
                        >
                            <img src={DepositIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Deposit</span>
                        </button>
                    </td>
                    <td style={{width: 120}}>
                        <button
                            style={{cursor: "pointer", display: "flex"}}
                            onClick={() => history.push("/withdraw", {active: IdCurrency.BTC})}
                        >
                            <img src={WithdrawIcon} alt="" width="16" />
                            <span style={{marginLeft: 10}}>Withdraw</span>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    );
};
