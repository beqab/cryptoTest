export interface IResponseBtcToUsd {
    changePercent: number;
    message: string;
    result: {
        Ask: number;
        Bid: number;
        Last: number;
        ask: number;
        bid: number;
        last: number; // this
    };
    success: boolean;
}
