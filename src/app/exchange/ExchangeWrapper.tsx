import * as React from "react";
import {ConsumerExchange, IConsumerExchange} from "./ConsumerExchange";
import {IExchangeProps} from "./Exchange";
import {useEffect} from "react";
import {withConsumer} from "../hoc/withConsumer";

export interface IExchangeWrapperProps extends IConsumerExchange {
    Child: React.FC<IExchangeProps>;
}

const ExchangeWrapperInner: React.FC<IExchangeWrapperProps> = ({
    Child,
    currencies,
    cryptos,
    exchangeEUR,
    exchangeUSD,
    diffUpdate,
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
}) => {
    useEffect(() => {
        start();

        return () => {
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Child
            diffUpdate={diffUpdate}
            exchangeEUR={exchangeEUR}
            exchangeUSD={exchangeUSD}
            currencies={currencies}
            cryptos={cryptos}
            selectedCurrency={selectedCurrency}
            selectedCrypto={selectedCrypto}
            setSelectedCurrency={setSelectedCurrency}
            setSelectedCrypto={setSelectedCrypto}
            value={value}
            setValue={setValue}
            cryptoToCurrency={cryptoToCurrency}
            setCrypytoToCurrency={setCrypytoToCurrency}
        />
    );
};

export const ExchangeWrapper = withConsumer(ConsumerExchange)(ExchangeWrapperInner);
