import React from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import FastAndEasy from "../../assets/images/fast-easy.png";
import Secure from "../../assets/images/secure.png";
import Convenient from "../../assets/images/convenient.png";

const Sepa = ({ isVerify }) => {
  const [amount1, setAmount1] = React.useState(0);
  const [sepaRes, setSepaRes] = React.useState(null);
  const [countries, setCountries] = React.useState([]);
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

  React.useState(() => {
    api.getCountrys().subscribe((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      {isVerify ? (
        <div className="payment_container sepaWithdraw">
          <p className="payment_p payment_p_title mb-0">
            Bank transfer details
          </p>
          <span className="payment_span">
            Please provide the information requested below in order to make a
            withdrawal to your bank account
          </span>
          <ul className="payment_list mb-20">
            <li>
              <span className="title">First Name</span>
              <input className="value" />
            </li>
            <li>
              <span className="title">Last Name</span>
              <input className="value" />
            </li>
            {/* <li>
                        <span className="title">Currency</span>
                        <input className="value" />
                    </li> */}
            <li>
              <span className="title"> Recipient's Bank Name:</span>
              <input className="value" />
            </li>

            <li>
              <span className="title">BIC</span>
              <input className="value" />
            </li>
            <li>
              <span className="title">IBAN</span>
              <input className="value" />
            </li>
            <li>
              <span className="title">Currency:</span>
              <select
                style={{
                  width: "100%",
                  border: "2px solid #3189E0",
                  borderRadius: "4px",
                  minHeight: "35px",
                }}
              >
                <option>EUR</option>
              </select>
            </li>
            <li>
              <span className="title">Country</span>
              <select
                style={{
                  width: "100%",
                  border: "2px solid #3189E0",
                  borderRadius: "4px",
                  minHeight: "35px",
                }}
              >
                <option className="d-none"></option>
                {countries.map((el, i) => {
                  return (
                    <option key={i} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li style={{ marginBottom: "0px" }}>
              <span className="title">City</span>
              <input className="value" />
            </li>
          </ul>

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
            Withdraw
          </button>
        </div>
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
                Verification process is fully compliant with AML/KYC regulations
              </p>
            </div>
          </div>

          <button onClick={() => history.push("/verification")}>
            {" "}
            Start Verification
          </button>
        </div>
      )}
    </>
  );
};

export default Sepa;
