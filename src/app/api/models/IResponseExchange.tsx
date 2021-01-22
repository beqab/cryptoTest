import {IBalance} from "./IResponeBalance";

export interface IResponseExchange {
    action: "success" | "error";
    userBalances: IBalance[];
    message : string ;
}
