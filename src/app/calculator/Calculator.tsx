import "./Calculator.scss";
import React, {useContext, useEffect} from "react";
import {monthsMax, monthsMin, monthsStep, valueMax, valueMin, valueStep} from "./calculatorConstants";
// import {Button} from "../generic/button/Button";
import {ContextCalculator} from "./ContextCalculator";
import {ICalculatorProps} from "./ICalculatorProps";
import {InfoBox} from "./info-box/InfoBox";
import {InfoBoxSlider} from "./info-box/InfoBoxSlider";
import {LabelMonths} from "./labels/LabelMonths";
import {LabelUsd} from "./labels/LabelUsd";
import {SliderBox} from "./slider/SliderBox";
import imgBtc from "../../assets/images/bitcoin.png";
import imgUsd from "../../assets/images/usd.png";
import {interval} from "rxjs";

const exchangeRequestInterval = 10000;
const transformerMonths = (value: number) => (value === 0.5 ? 0.5 : Math.round(value));

export const Calculator: React.FC<ICalculatorProps> = ({onClickGetLoan}) => {
    const {
        btcToUsdPrice,
        updateBtcToUsdPrice,
        loanPercentage,
        valueUsd,
        setValueUsd,
        valueMonths,
        setValueMonths,
        percentage,
    } = useContext(ContextCalculator);

    useEffect(() => {
        updateBtcToUsdPrice();
        const subscription = interval(exchangeRequestInterval).subscribe(updateBtcToUsdPrice);

        return () => subscription.unsubscribe();
        // eslint-disable-next-line
    }, []);

    const onChangeMonths = (value: number) => setValueMonths(transformerMonths(value));

    const __value1 = (valueUsd * loanPercentage * valueMonths) / 100;
    const __value2 = valueUsd + __value1;
    const __value3 = (valueUsd * 100) / percentage / btcToUsdPrice;

    return (
        <div className="Calculator">
            <h1 style={{fontSize: 50, textAlign: "center", fontWeight: 500, marginBottom: 50}}>Deposit</h1>
            <SliderBox
                titleLocaleId="Select amount"
                dimensionLocaleId="usd"
                min={valueMin}
                max={valueMax}
                step={valueStep}
                value={valueUsd}
                onChange={setValueUsd}
                LabelOnCurrentValue={LabelUsd}
                thumbClassName="horizontal-slider-thumb"
                tipTitle={"USD"}
            />
            <SliderBox
                titleLocaleId="Select Payment period"
                dimensionLocaleId="months"
                min={monthsMin}
                max={monthsMax}
                step={monthsStep}
                value={valueMonths}
                onChange={onChangeMonths}
                LabelOnCurrentValue={LabelMonths}
                LabelOnSliderEnd={LabelMonths}
                LabelOnSliderStart={LabelMonths}
                tipTitle={"Weeks"}
            />

            <InfoBoxSlider>
                <InfoBox localeId="Comission on deposit" value={`${loanPercentage}%`} />
                <InfoBox localeId="You can return" value={__value1.toFixed(2)} icon={imgUsd} />
                <InfoBox localeId="Will be withheld" value={__value2.toFixed(2)} icon={imgUsd} />
                <InfoBox localeId="Deposit amount" value={__value3.toFixed(6)} icon={imgBtc} />
            </InfoBoxSlider>
            {/*
            <div className="Calculator__button">
                <button className="Button--calculator" onClick={onClickGetLoan} />
            </div> */}
        </div>
    );
};
