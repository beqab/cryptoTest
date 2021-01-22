export interface IContextCalculator {
    btcToUsdPrice: number;
    updateBtcToUsdPrice: () => void;
    loanPercentage: number;
    valueMonths: number;
    valueUsd: number;
    setValueMonths: (value: number) => void;
    setValueUsd: (value: number) => void;
    percentage: number;
}
