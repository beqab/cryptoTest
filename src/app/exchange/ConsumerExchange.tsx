import * as React from "react";
import {useEffect, useState} from "react";
import {IExchangeItem} from "../api/models/IExchangeItem";
import {IExchangeProps} from "./Exchange";
import {IdCryptos} from "../api/constants/IdCryptos";
import {IdCurrency} from "../api/constants/IdCurrency";
import {api} from "../api/api";
import {utilNumbers} from "../utils/utilNumbers";

export interface ICurrencyItem {
    label: string;
    value: IdCurrency;
}

export interface ICryptoItem {
    label: string;
    value: IdCryptos;
}

export interface IProviderExchangeProps {}
export interface IConsumerExchange extends IExchangeProps {
    start: () => void;
    stop: () => void;
}

const initial: IConsumerExchange = {
    currencies: [],
    cryptos: [],
    exchangeUSD: {
        last: 0,
        changePercent: 0,
    },
    exchangeEUR: {
        last: 0,
        changePercent: 0,
    },
    diffUpdate: 0,
    selectedCurrency: IdCurrency.EUR,
    selectedCrypto: IdCryptos.BTC,
    setSelectedCurrency: (currency) => undefined,
    setSelectedCrypto: (crypto) => undefined,
    start: () => undefined,
    stop: () => undefined,
    value: "1",
    setValue: (value) => undefined,
    cryptoToCurrency: false,
    setCrypytoToCurrency: (value) => {},
};

export const ContextExchange = React.createContext(initial);
ContextExchange.displayName = "ContextExchange";

export const ConsumerExchange = ContextExchange.Consumer;

const fetchInterval = 10000;

export const currencies = [
    // {
    //     label: "USD",
    //     value: IdCurrency.USD,
    // },
    {
        label: "EUR",
        value: IdCurrency.EUR,
    },
];

export const cryptos = [
    {
        label: "BTC",
        value: IdCryptos.BTC,
    },
];

export const ProviderExchange: React.FC<IProviderExchangeProps> = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    const [nextUpdate, setNextUpdate] = useState(Date.now());
    const [diffUpdate, setDiffUpdate] = useState(0);
    const [exchangeUSD, setExchangeUSD] = useState<IExchangeItem>({
        last: 0,
        changePercent: 0,
    });
    const [exchangeEUR, setExchangeEUR] = useState<IExchangeItem>({
        last: 0,
        changePercent: 0,
    });
    const [selectedCurrency, setSelectedCurrency] = useState(IdCurrency.EUR);
    const [selectedCrypto, setSelectedCrypto] = useState(IdCryptos.BTC);
    const [value, setValue] = useState("1");
    const [cryptoToCurrency, setCrypytoToCurrency] = useState<boolean>(false);

    const getExchangeData = () => {
        api.getExchangeBtcEur().subscribe(({changePercent, last}) => {
            setExchangeEUR({
                last: parseFloat(last),
                changePercent,
            });
        });
        api.getExchangeBtcUsd().subscribe(({changePercent, result: {last}}) => {
            setExchangeUSD({
                changePercent,
                last,
            });
        });
    };

    useEffect(() => {
        const checkInterval = setInterval(() => {
            if (!isActive) {
                return;
            }

            const now = Date.now();

            setDiffUpdate(utilNumbers.clamp(Math.ceil((nextUpdate - now) / 1000), 0, 9));

            if (now > nextUpdate) {
                getExchangeData();
                setNextUpdate(now + fetchInterval);
            }
        }, 500);

        return () => {
            clearInterval(checkInterval);
        };
    }, [nextUpdate, isActive]);

    const start = () => {
        setDiffUpdate(utilNumbers.clamp(Math.ceil((nextUpdate - Date.now()) / 1000), 0, 9));
        setIsActive(true);
    };

    const stop = () => {
        setIsActive(false);
    };

    const context: IConsumerExchange = {
        currencies,
        cryptos,
        diffUpdate,
        exchangeEUR,
        exchangeUSD,
        selectedCurrency,
        selectedCrypto,
        setSelectedCurrency,
        setSelectedCrypto,
        start,
        stop,
        value,
        setValue,
        cryptoToCurrency,
        setCrypytoToCurrency,
    };

    return <ContextExchange.Provider value={context}>{children}</ContextExchange.Provider>;
};
