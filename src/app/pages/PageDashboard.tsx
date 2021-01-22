import * as React from "react";
import {ExchangeWithWithdraw} from "../exchange/ExchangeWithWithdraw";
import {ExchangeWrapper} from "../exchange/ExchangeWrapper";

export interface IPageDashboardProps {}

export const PageDashboard: React.FC<IPageDashboardProps> = () => {
    return (
        <div className="PageHome">
            <ExchangeWrapper Child={ExchangeWithWithdraw as any} />
        </div>
    );
};
