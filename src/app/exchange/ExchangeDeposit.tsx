import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {useContext, useEffect, useRef, useState} from "react";
import {ContextModal} from "../modal/ConsumerModal";
import Dropdown from "react-dropdown";
import {IExchangeProps} from "./Exchange";
import {IdCurrency} from "../api/constants/IdCurrency";
import {IdModal} from "../modal/IdModal";
import {utilNumbers} from "../utils/utilNumbers";
import {withConsumer} from "../hoc/withConsumer";

export interface IExchangeDepositProps extends IExchangeProps, IConsumerAuth {}

const ExchangeDepositInner: React.FC<IExchangeDepositProps> = ({
    exchangeEUR,
    exchangeUSD,
    diffUpdate,
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    user: {
        data: {balance, wallet},
    },
    value,
    setValue,
}) => {
    const {open} = useContext(ContextModal);
    const [copied, setCopied] = useState(false);

    const multipliedValue = utilNumbers.floor(
        parseFloat(value) * (selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last),
    );

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(balance);
        // eslint-disable-next-line
    }, [balance]);

    return (
        <div>
            <div className="content_l">
                <div className="content_title">Wallet</div>
                <div className="home_block1">
                    <div className="home_block1_l">BTC</div>
                    <input
                        readOnly
                        type="text"
                        className="home_block1_r"
                        onChange={(event) => setValue(event.target.value)}
                        value={value}
                    />
                </div>
                <div className="arrows" />

                <div className="home_block1">
                    <div className="home_block1_l">
                        <Dropdown
                            options={currencies}
                            value={selectedCurrency}
                            onChange={(option) => setSelectedCurrency(option.value as IdCurrency)}
                        />
                    </div>
                    <div className="home_block1_r" id="sell_value3">
                        {isNaN(multipliedValue) ? 0 : multipliedValue}
                    </div>
                </div>
                <div className="deposit_box">
                    <div className="deposit_wallet">&nbsp;&nbsp;Bitcoin Wallet Address </div>
                    <div className="deposit_box1">
                        <input
                            type="text"
                            className="deposit_input float-none"
                            ref={ref}
                            value={wallet}
                            onChange={(event) => undefined}
                        />
                        <div
                            className={`deposit_copy float-none d-block ${copied ? "green" : ""}`}
                            onClick={() => {
                                if (ref.current) {
                                    ref.current.select();
                                    document.execCommand("copy");
                                    setCopied(true);
                                }
                            }}
                        >
                            COPY
                        </div>
                    </div>
                    <div className="deposit_box2">
                        <div className="profile_title1 color-white mb-10">Scan QR Code</div>
                        <div>
                            <img
                                alt="google auth"
                                className="w-100"
                                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${wallet}`}
                                onClick={() => open(IdModal.QrCode)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="content_r">
                <div className="content_title">Bitcoin Price</div>
                <div>
                    <div className={`home_block2${exchangeUSD.last === 0 ? " block-loading" : ""}`}>
                        <div className="home_block2_l">
                            <div className="home_block2_title">USD</div>
                            <div className="home_block2_title1 btc-usd">{utilNumbers.floor(exchangeUSD.last)}</div>
                        </div>
                        <div className="home_block2_r">
                            <div className="home_block2_title3">Change over the period</div>
                            <div className={`home_block2_title4 ${exchangeUSD.changePercent < 0 ? "red" : "green"}`}>
                                {exchangeUSD.changePercent}%
                            </div>
                        </div>
                    </div>
                    <div className={`home_block2${exchangeEUR.last === 0 ? " block-loading" : ""}`}>
                        <div className="home_block2_l">
                            <div className="home_block2_title">EUR</div>
                            <div className="home_block2_title1 btc-eur">{utilNumbers.floor(exchangeEUR.last)}</div>
                        </div>
                        <div className="home_block2_r">
                            <div className="home_block2_title3">Change over the period</div>
                            <div className={`home_block2_title4 ${exchangeEUR.changePercent < 0 ? "red" : "green"}`}>
                                {exchangeEUR.changePercent}%
                            </div>
                        </div>
                    </div>
                    <div className="home_block2 data_box">
                        <div className="home_block2_title3">Data is Update Every Ten Second</div>
                        <div className="home_block2_title5" id="countdown1">
                            00:0{diffUpdate}
                        </div>
                    </div>
                </div>
            </div>
            <div className="clear" />
        </div>
    );
};

export const ExchangeDeposit = withConsumer(ConsumerAuth)(ExchangeDepositInner);
