import * as React from "react";
import { ConsumerAuth, IConsumerAuth } from "../auth/ConsumerAuth";
import { Exchange } from "../exchange/Exchange";
import { ConsumerModal } from "../modal/ConsumerModal";
import { IdModal } from "../modal/IdModal";
import { IConsumerModal } from "../modal/IConsumerModal";

import { ExchangeWrapper } from "../exchange/ExchangeWrapper";
import { IdPath } from "../router/IdPath";
import { RouterProps } from "react-router";
import { compose } from "recompose";
import { withConsumer } from "../hoc/withConsumer";
import Money from "../../assets/images/money.svg";
import SmartPhone from "../../assets/images/iPhoneXS.png";
import CreditCard from "../../assets/images/creditCard.png";
import CreditCard3 from "../../assets/images/masterCard3.png";
import Bill from "../../assets/images/bill.svg";
import Live from "../../assets/images/live.svg";
import ArrowRight from "../../assets/images/Arrow-Icon.svg";
import { Calculator } from "../calculator/Calculator";
import WhyPeopleChooseWe from "../../assets/images/why-people-choose-we.png";

import TabSlider from "../tabSlider";

export interface IPageHomeProps
  extends RouterProps,
    IConsumerAuth,
    IConsumerModal {}

const PageHomeInner: React.FC<IPageHomeProps> = ({
  isLoggedIn,
  history,
  open,
}) => {
  if (isLoggedIn) {
    history.push(IdPath.Dashboard);
  }

  const currencys = [
    {
      title: "USD / BTC",
      price: "7.8892",
      percent: "- 3.55",
    },
    {
      title: "USD / ETH",
      price: "3.5495",
      percent: "+ 8.21",
    },
    {
      title: "USD / BTC",
      price: "7.8892",
      percent: "- 3.55",
    },
    {
      title: "USD / BTC",
      price: "7.8892",
      percent: "- 3.55",
    },
  ];

  const helpers = [
    {
      image: Money,
      text: "Best rates on the market",
    },
    {
      image: Bill,
      text: "Transparent 0.25% fee",
    },
    {
      image: Live,
      text: "Support",
    },
  ];

  return (
    <div className="PageHome">
      {/* <ExchangeWrapper Child={Exchange} /> */}
      {/* <div className="PageHome__section">
                <div className="content_title">Deposit</div>
                <iframe
                    title="Get loan"
                    src="https://cryptoiex.io/deposit/calculator-preview"
                    className="PageHome__iframe"
                />
            </div> */}
      <div className="PageHome-top">
        <div className="PageHome-top-left">
          <span className="PageHome-top-left-title">
            <b>I</b>nstant <b>EX</b>change
          </span>
          <span className="PageHome-top-left-description">
            We made it fast and easy <br /> Founded in 2019 by the group of
            crypto entrepreneurs and enthusiasts, CryptoIEX is the premier
            Estonia - based blockchain platform, providing lightning-fast trade
            execution
          </span>
        </div>
        <div className="PageHome-top-right">
          <ExchangeWrapper Child={Exchange} />
        </div>
      </div>
      <div className="PageHome_firstSection ">
        <div className="PageHome_firstSection-img">
          <img src={SmartPhone} />
        </div>
        <div className="PageHome_firstSection-content">
          <h3>A trusted and secure crypto exchange</h3>
          <p>
            Secure platform – Cryptoiex employs the most reliable, effective
            security technologies available. We keep to offer customer friendly
            solutions and most profitable rates.
          </p>
          <p>
            Also, Cryptoiex enables two-factor authentication for all users and
            provides a host of additional security features to provide multiple
            layers of protection. At Cryptoiex, security will always be a top
            priority in every decision we make.
          </p>
          <div className="d-flex pt-40">
            <button
              className="round_button round_button-signUp mr-20"
              onClick={() => open(IdModal.RegistrationPrompt)}
            >
              <span> SIGN UP </span>
              <span>
                <img src={ArrowRight} />
              </span>
            </button>
            {/* <button className="round_button round_button-white  round_button-readMore mr-20">
                            LEARN MORE
                        </button>
                        */}
          </div>
        </div>
      </div>

      {/* <div className="PageHome_currency-prices">
                {currencys.map((item) => (
                    <div className="PageHome_currency-prices-item">
                        <div className="PageHome_currency-prices-item_left-box">
                            <span className="PageHome_currency-prices-item_left-box-title">
                                <b>{item.title}</b>
                            </span>
                            <span className="PageHome_currency-prices-item_left-box-price">{item.price}</span>
                            <span className="PageHome_currency-prices-item_left-box-percent">{item.percent}</span>
                        </div>
                        <div>&nbsp;</div>
                    </div>
                ))}
            </div> */}

      <TabSlider />

      <div className="PageHome_withCard d-flex">
        <div className="row">
          <div className="PageHome_withCard-description ">
            <h3>Buy crypto with a debit or credit card</h3>
            <h4>Quickly purchase top cryptocurrencies</h4>
            <p>
              Become a crypto owner in minutes using your debit or credit card.
            </p>
            <h4>Easily withdraw your money</h4>
            <p>
              Withdraw your funds to a card or bank account in a few clicks.
            </p>
            {/* <div className=" pt-40">
                            <div className="PageHome_withCard-description-cardTitle">Partners</div>
                            <img src={CreditCard3} />
                        </div> */}
          </div>
          <div className="PageHome_withCard-img  ">
            <img src={CreditCard} />
          </div>
        </div>
      </div>

      {/* <div className="PageHome-helpers">
                {helpers.map((item) => (
                    <div className="PageHome-helpers-item">
                        <img src={item.image} width="100" height="100" />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
            <div></div>
            <Calculator onClickGetLoan={() => {}} /> */}
    </div>
  );
};

const enhance = compose<any, any>(
  withConsumer(ConsumerModal),
  withConsumer(ConsumerAuth)
);

export const PageHome = enhance(PageHomeInner);
