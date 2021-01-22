import {IBalance} from "./IResponeBalance";

export interface IResponseDeposit {
    action: "success" | "error";
    userBalances: IBalance[];
}
