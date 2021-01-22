export interface ITransaction {
    txId: string | number;
    block_time: number;
    amount: number;
    transactionAction: "deposit" | "withdraw";
    fee: number;
}

export interface IResponseTransactions {
    action: "success" | "error";
    data: ITransaction[];
}
