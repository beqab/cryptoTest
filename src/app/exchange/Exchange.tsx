import * as React from "react";
import {ConsumerModal} from "../modal/ConsumerModal";
import Dropdown from "react-dropdown";
import {IConsumerModal} from "../modal/IConsumerModal";
import {ICryptoItem} from "./ConsumerExchange";
import {ICurrencyItem} from "./ConsumerExchange";
import {IExchangeItem} from "../api/models/IExchangeItem";
import {IdCryptos} from "../api/constants/IdCryptos";
import {IdCurrency} from "../api/constants/IdCurrency";
import {IdModal} from "../modal/IdModal";
import {utilNumbers} from "../utils/utilNumbers";
import {withConsumer} from "../hoc/withConsumer";
import SwapIcon from "../../assets/images/swap_icon.png";

export interface IExchangeProps {
    currencies: ICurrencyItem[];
    cryptos: ICryptoItem[];
    exchangeEUR: IExchangeItem;
    exchangeUSD: IExchangeItem;
    diffUpdate: number;
    selectedCurrency: IdCurrency;
    selectedCrypto: IdCryptos;
    setSelectedCurrency: (currency: IdCurrency) => void;
    setSelectedCrypto: (currency: IdCryptos) => void;
    value: string;
    setValue: (value: string) => void;
    cryptoToCurrency: boolean;
    setCrypytoToCurrency: (value: boolean) => void;
}

export interface IExchangeWithModalProps extends IExchangeProps, IConsumerModal {}

const ExchangeInner: React.FC<IExchangeWithModalProps> = ({
    exchangeEUR,
    exchangeUSD,
    cryptos,
    selectedCrypto,
    open,
    setSelectedCrypto,
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    value,
    setValue,
    setCrypytoToCurrency,
    cryptoToCurrency,
}) => {
    const multipliedValue = utilNumbers.floor(
        parseFloat(value) / (selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last),
        5,
    );
    const currencyToCryptoValue = utilNumbers.floor(
        parseFloat(value) / (selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last),
        5,
    );
    const cryptoToCurrencyValue = utilNumbers.floor(
        parseFloat(value) * (selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last),
        5,
    );

    return (
        <div className="content_l1 exchange-mobile" style={{width: "100%"}}>
            <div className="content_title">Exchange</div>
            <div className={`content_l1-inputs ${cryptoToCurrency ? "content_l1-inputs-reverse" : ""}`}>
                <div className="home_block11" style={{marginTop: 10}}>
                    <input
                        type="text"
                        className="home_block1_l1S"
                        onChange={(event) => setValue(event.target.value)}
                        value={!cryptoToCurrency ? value : cryptoToCurrencyValue}
                        readOnly={cryptoToCurrency}
                    />
                    <Dropdown
                        className="Dropdown--wide"
                        options={currencies}
                        value={selectedCurrency}
                        onChange={(option) => setSelectedCurrency(option.value as IdCurrency)}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                    <span style={{color: "#fff"}}>
                        {`1 BTC = ${selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last} ${
                            selectedCurrency === IdCurrency.USD ? "USD" : "EUR"
                        }`}
                    </span>
                    <img
                        src={SwapIcon}
                        alt=""
                        width="20"
                        height="20"
                        style={{cursor: "pointer"}}
                        onClick={() => setCrypytoToCurrency(!cryptoToCurrency)}
                    />
                </div>
                <div className="home_block11" style={{marginTop: 10}}>
                    <input
                        type="text"
                        className="home_block1_l1S"
                        value={cryptoToCurrency ? value : currencyToCryptoValue}
                        readOnly={!cryptoToCurrency}
                        onChange={(event) => setValue(event.target.value)}
                    />
                    <Dropdown
                        className="Dropdown--wide"
                        options={cryptos}
                        value={selectedCrypto}
                        onChange={(option) => setSelectedCrypto(option.value as IdCryptos)}
                    />
                </div>
                <div className="clear" />
            </div>
            <button className="sell_button" onClick={() => open(IdModal.RegistrationPrompt)}>
                Sign Up
            </button>
        </div>
    );
};

export const Exchange = withConsumer(ConsumerModal)(ExchangeInner);
