import React, {useState} from "react";
import {loanPercentage, monthDefault, percentage, valueDefault} from "./calculatorConstants";
import {IContextCalculator} from "./IContextCalculator";
import {api} from "../api/api";
import {contextCalculatorInitial} from "./contextCalculatorInitial";

export const ContextCalculator = React.createContext<IContextCalculator>(contextCalculatorInitial);
ContextCalculator.displayName = "ContextCalculator";

export const ConsumerCalculator = ContextCalculator.Consumer;

export const ProviderCalculator: React.FC = ({children}) => {
    const [valueUsd, setValueUsd] = useState(valueDefault);
    const [valueMonths, setValueMonths] = useState(monthDefault);
    const [btcToUsdPrice, setBtcToUsdPrice] = useState(0);

    const updateBtcToUsdPrice = () =>
        api.getExchangeBtcUsd().subscribe((response) => {
            if (response && response.result && response.result.last) {
                setBtcToUsdPrice(response.result.last);
            }
        });

    const value: IContextCalculator = {
        btcToUsdPrice,
        updateBtcToUsdPrice,
        loanPercentage,
        setValueMonths,
        setValueUsd,
        valueMonths,
        valueUsd,
        percentage,
    };

    return <ContextCalculator.Provider value={value}>{children}</ContextCalculator.Provider>;
};
