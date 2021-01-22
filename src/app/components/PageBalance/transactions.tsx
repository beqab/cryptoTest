import React from "react";

import DepositIcon from "../../../assets/images/deposit_icon_blue.png";
import WithdrawIcon from "../../../assets/images/withdraw_icon_blue.png";
import {api} from "../../api/api";
import {ITransaction} from "../../api/models/IResponseTransactions";

export const Transactions: React.FC = () => {
    const [transactions, setTransactions] = React.useState<ITransaction[]>([]);

    React.useEffect(() => {
        api.transactions().subscribe((response) => {
            setTransactions(response.data);
        });
    }, []);

    function formatDate(date: number): string {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    return (
        <div style={{overflowX: "auto"}}>
            <table className="balance-table">
                <thead>
                    <tr style={{width: "100%"}}>
                        <th style={{minWidth: 200}}>ID</th>
                        <th style={{minWidth: 200}}>Date</th>
                        <th style={{minWidth: 200}}>Amount</th>
                        <th style={{minWidth: 200}}>Type</th>
                        <th style={{minWidth: 200}}>Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr>
                            <td>
                                <span className="transaction-id"> {transaction.txId} </span>
                            </td>
                            <td>{formatDate(transaction.block_time)}</td>
                            <td>
                                <span
                                    style={{
                                        backgroundColor:
                                            transaction.transactionAction === "deposit" ? "#006EDA" : "#DA003B",
                                        padding: "5px 20px 5px 20px",
                                        borderRadius: 5,
                                        color: "#fff",
                                        fontSize: 11,
                                    }}
                                >
                                    {transaction.amount}
                                </span>
                            </td>
                            <td>
                                <img
                                    src={transaction.transactionAction === "deposit" ? DepositIcon : WithdrawIcon}
                                    alt=""
                                    width="16"
                                />
                                <span style={{marginLeft: 10}}>
                                    {transaction.transactionAction === "deposit" ? "Deposit" : "Withdraw"}
                                </span>
                            </td>
                            <td>{transaction.fee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
