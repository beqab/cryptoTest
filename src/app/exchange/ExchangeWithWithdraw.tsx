import React, { useState } from "react";
import { ConsumerAuth, IConsumerAuth } from "../auth/ConsumerAuth";
import { ConsumerModal } from "../modal/ConsumerModal";
import Dropdown from "react-dropdown";
import { IConsumerModal } from "../modal/IConsumerModal";
import { IExchangeProps } from "./Exchange";
import { IdCryptos } from "../api/constants/IdCryptos";
import { IdCurrency } from "../api/constants/IdCurrency";
import { IdModal } from "../modal/IdModal";
import { compose } from "recompose";
import { useEffect } from "react";
import { utilNumbers } from "../utils/utilNumbers";
import { withConsumer } from "../hoc/withConsumer";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { VerticalLine } from "../components/vertical-line";
import { HorizontalLine } from "../components/horizontal-line";
import "react-circular-progressbar/dist/styles.css";
import Copy from "../../assets/images/copy2.png";
import Modal from "react-modal";
import { useUtilBrowser } from "../utils/UtilBrowserHook";
import { api } from "../api/api";
import SwapIcon from "../../assets/images/swap_icon.png";

export interface IExchangeWithWithdrawProps
  extends IExchangeProps,
    IConsumerAuth,
    IConsumerModal {}

const ExchangeWithWithdrawInner: React.FC<IExchangeWithWithdrawProps> = ({
  currencies,
  cryptos,
  exchangeUSD,
  exchangeEUR,
  diffUpdate,
  open,
  selectedCurrency,
  setSelectedCurrency,
  selectedCrypto,
  setSelectedCrypto,
  value,
  setValue,
  user: {
    data: { balance, wallet },
    googleCaptcha,
  },
  setBalance,
  cryptoToCurrency,
  setCrypytoToCurrency,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasAnswerToExchange, setHasAnswerToExchange] = useState<boolean>(
    false
  );
  const [exchangeFetching, setExchangeFetching] = useState<boolean>(false);
  const [exchangeStatus, setExchangeStatus] = useState<boolean>(false);
  const [exchangeErrorMessage, setExchangeErrorMessage] = useState<
    string | null
  >(null);

  const currencyToCryptoValue = utilNumbers.floor(
    parseFloat(value) /
      (selectedCurrency === IdCurrency.USD
        ? exchangeUSD.last
        : exchangeEUR.last),
    5
  );
  const cryptoToCurrencyValue = utilNumbers.floor(
    parseFloat(value) *
      (selectedCurrency === IdCurrency.USD
        ? exchangeUSD.last
        : exchangeEUR.last),
    5
  );

  const isMobile = useUtilBrowser();

  const label = currencies.find((item) => item.value === selectedCurrency)!
    .label;

  useEffect(() => {
    setValue(balance);
    // eslint-disable-next-line
  }, [balance]);

  const exchange = () => {
    setExchangeFetching(true);

    api
      .exchange(
        cryptoToCurrency ? "btc" : selectedCurrency,
        cryptoToCurrency ? selectedCurrency : "btc",
        parseFloat(value)
      )
      .subscribe((data) => {
        setExchangeStatus(data.action === "success");
        setExchangeFetching(false);
        if (data.action === "error") {
          if (data.message) {
            setExchangeErrorMessage(data.message);
          }
        }
        if (data.action === "success") setBalance(data.userBalances);
      });
  };

  return (
    <div className="PageDashboard">
      {showModal && (
        <Modal
          ariaHideApp={false}
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            content: {
              maxWidth: isMobile ? "75%" : 500,
              width: "100%",
              borderRadius: 15,
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {!hasAnswerToExchange ? (
            <>
              <div className="exchangeView">
                <div className="exchangeView-header">
                  buy <b>{currencyToCryptoValue} BTC</b> for <b>{value} EUR</b>
                </div>

                <div className="exchangeView-body">
                  <div className="exchangeView-body-commission">
                    <div className="precent">
                      <div> commission</div>
                      <span>{exchangeEUR.changePercent}%</span>
                    </div>
                    <div className="value">
                      {(
                        (Number(value) / 100) *
                        exchangeEUR.changePercent
                      ).toFixed(2)}{" "}
                      EUR
                    </div>
                  </div>
                  <div className="getPay">
                    <b>Get</b>
                    <b>{currencyToCryptoValue} BTC</b>
                  </div>
                  <div className="getPay">
                    <b>Pay</b>
                    <b>
                      {Number(value) -
                        Number(
                          (
                            (Number(value) / 100) *
                            exchangeEUR.changePercent
                          ).toFixed(2)
                        )}{" "}
                      EUR
                    </b>
                  </div>
                </div>

                <div style={{ display: "flex", width: "100%" }}>
                  {/* <button
                                        className="sell_button"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            border: "2px solid #006EDA",
                                            backgroundColor: "#fff",
                                            color: "#006EDA",
                                        }}
                                    >
                                        NO
                                </button> */}
                  <button
                    className="sell_button w-100"
                    // style={{ marginLeft: 20 }}
                    onClick={() => {
                      setHasAnswerToExchange(true);
                      exchange();
                    }}
                  >
                    Exchange
                  </button>
                </div>
              </div>
              {/* <p style={{fontSize: isMobile ? 16 : 20, color: "#006EDA"}}>
                                Do you really want to Exchange?
                            </p>
                            <p
                                style={{
                                    fontSize: isMobile ? 14 : 20,
                                    textAlign: "center",
                                    color: "#006EDA",
                                    opacity: "0.6",
                                    marginTop: 30,
                                }}
                            >
                                Note that it is not possible to return the exchange!
                            </p>
                            <div style={{display: "flex", width: "100%"}}>
                                <button
                                    className="sell_button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        border: "3px solid #006EDA",
                                        backgroundColor: "#fff",
                                        color: "#006EDA",
                                    }}
                                >
                                    NO
                                </button>
                                <button
                                    className="sell_button"
                                    style={{marginLeft: 20}}
                                    onClick={() => {
                                        setHasAnswerToExchange(true);
                                        exchange();
                                    }}
                                >
                                    YES
                                </button>
                            </div> */}
            </>
          ) : exchangeFetching ? (
            <p>Loading ...</p>
          ) : (
            <>
              <p style={{ color: "#006EDA" }} className="text-center">
                {exchangeStatus
                  ? "Successfully Exchanged"
                  : exchangeErrorMessage || "Something went wrong"}
              </p>
              <button
                className="sell_button"
                style={{ maxWidth: 230 }}
                onClick={() => {
                  setHasAnswerToExchange(false);
                  setShowModal(false);
                }}
              >
                Done
              </button>
            </>
          )}
        </Modal>
      )}
      <div className="content_l1">
        <div className="content_title">Exchange</div>
        <div className="content_l1-background">
          <div
            className={`content_l1-inputs ${
              cryptoToCurrency ? "content_l1-inputs-reverse" : ""
            }`}
          >
            <div className="home_block11">
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
                onChange={(option) =>
                  setSelectedCurrency(option.value as IdCurrency)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <span style={{ color: "#fff" }}>
                {`1 BTC = ${
                  selectedCurrency === IdCurrency.USD
                    ? exchangeUSD.last
                    : exchangeEUR.last
                } ${selectedCurrency === IdCurrency.USD ? "USD" : "EUR"}`}
              </span>
              <img
                src={SwapIcon}
                alt=""
                width="20"
                height="20"
                style={{ cursor: "pointer" }}
                onClick={() => setCrypytoToCurrency(!cryptoToCurrency)}
              />
            </div>
            <div className="home_block11">
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
                onChange={(option) =>
                  setSelectedCrypto(option.value as IdCryptos)
                }
              />
            </div>
          </div>
          <div className="clear" />
          <button className="sell_button" onClick={() => setShowModal(true)}>
            Exchange
          </button>

          {/* <div className="bitcoint-wallet-address-bg">
                        <img src={googleCaptcha} width="150" height="150" alt="google captcha" style={{border: "5px solid #006EDA", borderRadius: 10}} />
                        <div className="bitcoint-wallet-address-bg-right">
                            <p style={{color: "#ffffff", fontSize: 22}}>Bitcoin wallet address</p>
                            <div className="bitcoint-wallet-address-bg-right-copy-bg">
                                <span style={{color: "#ffffff", fontSize: 14}}>{wallet}</span>
                                <span
                                    className="bitcoint-wallet-address-bg-right-copy-bg-img"
                                    onClick={() => navigator.clipboard.writeText(wallet)}
                                >
                                    <img src={Copy} alt="copy" />
                                </span>
                            </div>
                        </div>
                    </div>

                    */}
        </div>
      </div>
      <div className="PageDashboard-horizontal-line">
        <HorizontalLine />
      </div>
      <div className="PageDashboard-vertical-line">
        <VerticalLine />
      </div>
      <div className="content_r1">
        <div className="content_title">Bitcoin Price</div>
        <div style={{ marginTop: 40 }}>
          <div className="data_update">
            <div className="data_update-box">
              <div className="home_block3_title3">
                Data is Update Every Ten Second
              </div>
              <div style={{ width: 50 }}>
                <CircularProgressbarWithChildren
                  minValue={0}
                  maxValue={10}
                  value={10 - diffUpdate}
                >
                  <span
                    style={{ fontSize: 12, color: "#333", fontWeight: 600 }}
                  >
                    <b>{`0${diffUpdate}`}</b>
                  </span>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </div>
          <div
            className={`home_block3${
              exchangeUSD.last === 0 ? " block-loading" : ""
            }`}
          >
            <div className="">
              <div className="home_block3_title">USD</div>
              <div className="home_block3_title1 btc-usd">
                {utilNumbers.floor(exchangeUSD.last)}
              </div>
            </div>
            <div className="home_block3_title3">Change over the period</div>
            <div className="">
              <div
                className={`home_block2_title4 ${
                  exchangeUSD.changePercent < 0 ? "red" : "green"
                }`}
              >
                {`${
                  exchangeUSD.changePercent < 0
                    ? ""
                    : exchangeUSD.changePercent > 0
                    ? "+"
                    : ""
                } ${exchangeUSD.changePercent}`}
                %
              </div>
            </div>
          </div>
          <div
            className={`home_block3${
              exchangeEUR.last === 0 ? " block-loading" : ""
            }`}
          >
            <div className="">
              <div className="home_block3_title">EUR</div>
              <div className="home_block3_title1 btc-eur">
                {utilNumbers.floor(exchangeEUR.last)}
              </div>
            </div>
            <div className="home_block3_title3">Change over the period</div>
            <div className="">
              <div
                className={`home_block2_title4 ${
                  exchangeEUR.changePercent < 0 ? "red" : "green"
                }`}
              >
                {`${
                  exchangeEUR.changePercent < 0
                    ? ""
                    : exchangeEUR.changePercent > 0
                    ? "+"
                    : ""
                } ${exchangeEUR.changePercent}`}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clear" />
    </div>
  );
};

const enhance = compose<IExchangeWithWithdrawProps, IExchangeProps>(
  withConsumer(ConsumerAuth),
  withConsumer(ConsumerModal)
);

export const ExchangeWithWithdraw = enhance(ExchangeWithWithdrawInner);
