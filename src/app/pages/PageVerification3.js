import { relative } from "path";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Lock from "../../assets/images/verificationLock.svg";
import { withConsumer } from "../hoc/withConsumer";
import { ConsumerAuth, IConsumerAuth } from "../auth/ConsumerAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const infoModalContent = {
  Starter: {
    content: () => (
      <>
        <h2>Starter Verification</h2>
        <div className="title">STAGE ONE </div>
        <div>Starter verification</div>
        <p>
          Stage one transactions are available for you by verifying your email
          and adding your credit or debit card to your CryptoIEX account Starter
          verification allows you to:
        </p>
        <p>
          -nstantly buy crypto using your debit/credit card; <br />
          -Make unlimited card deposits and withdrawals of up to $100 daily;{" "}
          <br />
          -Make unlimited crypto deposits and withdrawals. <br />
        </p>
      </>
    ),
  },

  Intermediate: {
    content: () => (
      <>
        <h2>Intermediate Verification</h2>
        <div className="title">STAGE TWO</div>
        <p>
          It's basic level of account verification on CryptoIEX. To apply for it
          submit copies of your identity document. It’ll take up to 5 minutes of
          your time. Intermediate verification allows you to: Multiple payment
          methods: apart from debit/credit cards and cryptocurrencies, you’ll be
          able to use domestic and international bank transfers;
        </p>
        <p>
          Increased account limits: deposits of up to $3.000 daily and
          withdrawals of up to $10.000.00 daily
        </p>
        <p>
          Identity verification on our platform is performed by Onfido. By
          uploading your documents and photos on the CryptoIEX website, you
          agree to transfer this personal information to Onfido for its further
          processing and verification.
        </p>
      </>
    ),
  },
  Advanced: {
    content: () => (
      <>
        <h2>Identity Verification</h2>
        <div className="title">STAGE THREE</div>
        <p>
          Advanced verification is required if you need higher payment limits.
        </p>
        <p>
          To apply for it, fill out a short application and provide a document
          confirming your residential address. We may also ask you to pass
          Advanced verification to meet KYC/AML requirements. To do so, you’ll
          need to provide documents confirming your source of income. Advanced
          verification enables:
        </p>
        <p>
          -Multiple payment options: debit/credit card, bank transfer,
          cryptocurrency;
          <br />
          -Increased account limits: deposits of up to $10,000 daily and
          withdrawals of up to $30,000 daily.
          <br />
          -Priority support.
          <br />
        </p>
      </>
    ),
  },
};

class PageVerification3 extends Component {
  state = {
    infoModalType: null,
  };

  setInfoModal = (type) => {
    this.setState({
      infoModalType: type,
    });
  };

  render() {
    const { infoModalType } = this.state;
    const { onfido_status } = this.props.user.data;

    return (
      <div className="" style={{ position: "relative" }}>
        {infoModalType && (
          <>
            <div
              onClick={() => this.setInfoModal(null)}
              className="bgBlur"
            ></div>
            <div className="infoModal">
              <div
                onClick={() => this.setInfoModal(null)}
                className="closeIcon"
              >
                X
              </div>
              {infoModalContent[this.state.infoModalType].content()}
            </div>
          </>
        )}

        <div className="container onfido">
          <h3>Verification</h3>
          <div className="cardsContainer">
            <div className="verificationCard">
              <div className="wrapper">
                <div className="cardName">Starter</div>
                <div className="cardStatus">
                  {/* <Link to="/onfido">start</Link> */}

                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color="#579c57"
                    size="lg"
                  />
                </div>
              </div>
              <div className="cardInfo">
                <p>
                  Make deposits totaling $100 for the account lifetime,
                  withdrawals - up to $100 daily.
                </p>
              </div>
              <button
                className="info"
                onClick={() => this.setInfoModal("Starter")}
              >
                More info
              </button>
            </div>
            <div className="verificationCard">
              <div className="wrapper">
                <div className="cardName">Intermediate</div>
                <div className="cardStatus">
                  {/* <img src={Lock} height="30" /> */}

                  {onfido_status === "APPLICANT_PENDING" ||
                  onfido_status === "APPLICANT_CREATED" ? (
                    <span style={{ color: "#f3cb82" }}>
                      pending{" "}
                      <FontAwesomeIcon
                        icon={faUserClock}
                        color="#f3cb82"
                        size="lg"
                      />
                    </span>
                  ) : onfido_status === "APPLICANT_CONFIRMED" ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      color="#579c57"
                      size="lg"
                    />
                  ) : (
                    <Link to="/onfido">start</Link>
                  )}
                </div>
              </div>
              <div className="cardInfo">
                <p>
                  Level up your daily limits: deposits — up to $3,000.00,
                  withdrawals — up to $10,000.00.
                </p>
              </div>
              <button
                className="info"
                onClick={() => this.setInfoModal("Intermediate")}
              >
                More info
              </button>
            </div>
            <div className="verificationCard">
              <div className="wrapper">
                <div className="cardName">Advanced</div>
                <div className="cardStatus">
                  {onfido_status === "APPLICANT_CONFIRMED" ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      color="#579c57"
                      size="lg"
                    />
                  ) : (
                    <img src={Lock} height="30" />
                  )}
                </div>
              </div>
              <div className="cardInfo">
                <p>
                  Unlock bank transfers and get advanced daily limits: deposits
                  — up to $10,000.00, withdrawals — up to $30,000.00.
                </p>
              </div>
              <button
                className="info"
                onClick={() => this.setInfoModal("Advanced")}
              >
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default PageVerification3;

export default withConsumer(ConsumerAuth)(PageVerification3);
