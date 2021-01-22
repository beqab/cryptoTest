import {loanPercentage, percentage} from "./calculatorConstants";
import {IContextCalculator} from "./IContextCalculator";

export const contextCalculatorInitial: IContextCalculator = {
    btcToUsdPrice: 1,
    updateBtcToUsdPrice: () => undefined,
    loanPercentage,
    valueMonths: 0,
    valueUsd: 0,
    setValueMonths: () => undefined,
    setValueUsd: () => undefined,
    percentage,
};
