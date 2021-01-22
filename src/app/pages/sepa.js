import React from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import FastAndEasy from "../../assets/images/fast-easy.png";
import Secure from "../../assets/images/secure.png";
import Convenient from "../../assets/images/convenient.png";
import { Link } from "react-router-dom";

const Sepa = ({ isverify }) => {
  const [amount1, setAmount1] = React.useState(0);
  const [sepaRes, setSepaRes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const makeDepositSepa = () => {
    setLoading(true);
    api.beforeDeposit().subscribe((response) => {
      if (response.action === "success") {
        console.log(response, "response");
        setSepaRes(response);
      } else {
        toast.error(response.error_description || response.message);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <div className="payment_container">
        {sepaRes ? (
          <>
            <div className="newSepa">
              <p className="payment_p  payment_p_title  mb-0">
                Bank transfer details
              </p>

              <span className="payment_span">
                PLEASE USE THESE PAYMENT DETAILS TO MAKE A DEPOSIT <br />
                Payment processing usually takes 1-2 business days to be
                credited to your CryptoIEX account
              </span>
              <ul className="payment_list">
                <li>
                  <span className="title">Beneficiary Name:</span>
                  <span className="value">IEX OU</span>
                </li>
                <li>
                  <span className="title">Beneficiary Account Number: </span>
                  <span className="value">{sepaRes.IBAN}</span>
                </li>
                <li>
                  <span className="title">Beneficiary's Bank Name:</span>
                  <span className="value">Clear Junction Limited</span>
                </li>
                <li>
                  <span className="title">Addressable in: </span>
                  <span className="value">SEPA </span>
                </li>
                <li>
                  <span className="title">Beneficiary's Bank address: </span>
                  <span className="value">
                    {" "}
                    15 Kingsway, London WC2B 6UN, UK
                  </span>
                </li>
                <li>
                  <span className="title">BIC: </span>
                  <span className="value"> CLJUGB21</span>
                </li>
                <li>
                  <span className="title">Your Reference: </span>
                  <span className="value"> {sepaRes.DESCRIPTION}</span>
                </li>
              </ul>
              <span className="payment_span red">
                REFERENCE SHOULD BE ENTERED FIRST IN THE NARRATIVE OF THE
                SENDING BANK'S PAYMENT INSTRUCTIONS, BEFORE ANY OTHER
                REFERENCES.
              </span>
              <br />
              <span className="payment_span red">
                PLEASE SEND THE EXACT AMOUNT IN CURRENCY YOU APPLIED FOR
                (EXCLUDING BANK CHARGES) AND MAKE SURE YOUR PAYMENT DETAILS IS
                STATED CORRECTLY.
              </span>
              <br />

              <span className="payment_span red">
                Payments from third parties will not be accepted and returned
                back to the sender
              </span>
              <br />
              <span className="payment_span red">
                Please note that bank charges for payment return will be
                deducted from the amount
              </span>

              <Link
                target="_blank"
                to="/transferDetails"
                className="sell_button payment_btn d-flex align-items-center justify-content-center "
              >
                Download
              </Link>
            </div>
          </>
        ) : isverify ? (
          <>
            <div className="PageDeposit-left_box-input_box  payment_input">
              <label>{"EUR"}</label>
              <input
                type="number"
                value={amount1}
                onChange={(e) => setAmount1(parseFloat(e.target.value))}
              />
            </div>
            <button
              className="sell_button payment_btn"
              onClick={makeDepositSepa}
              disabled={loading}
            >
              Deposit
            </button>
          </>
        ) : (
          <div className="unVerifyPaymentPage">
            <h4 className="text-center">
              Verify your identity to use this payment method
            </h4>
            <h6 className="text-center">
              After successful verification your account limits will also be
              increased{" "}
            </h6>
            <div className="row">
              <div>
                <img src={Secure} />

                <div className="title"> Secure </div>
                <p>All provided information is encrypted and securely stored</p>
              </div>
              <div>
                <img src={FastAndEasy} />

                <div className="title"> Simple </div>
                <p>
                  Verification process is very simple and it would not take you
                  much time
                </p>
              </div>
              <div>
                <img src={Convenient} />

                <div className="title"> Compliant </div>
                <p>
                  Verification process is fully compliant with AML/KYC
                  regulations
                </p>
              </div>
            </div>

            <button onClick={() => history.push("/verification")}>
              {" "}
              Start Verification
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sepa;
