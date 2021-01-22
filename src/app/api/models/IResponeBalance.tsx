export interface IResponeBalance {
    action: "success" | "error" | undefined;
    data: IBalance[]
}

export interface IBalance {
    balance: number;
    type: "USD" | "EUR" | "BITCOIN";
}

export interface Balance {
    USD: {
        balance: number
    };
    EUR: {
        balance: number
    };
    BITCOIN: {
        balance: number
    };
}