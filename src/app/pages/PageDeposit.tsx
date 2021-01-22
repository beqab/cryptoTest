import * as React from "react";
import {ExchangeDeposit} from "../exchange/ExchangeDeposit";
import {ExchangeWrapper} from "../exchange/ExchangeWrapper";

export interface IPageDepositProps {}

export const PageDeposit: React.FC<IPageDepositProps> = () => {
    return <ExchangeWrapper Child={ExchangeDeposit} />;
};
