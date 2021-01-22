import React from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import Logo from "../../assets/images/asset1.svg";

import Pdf from "react-to-pdf";
const ref = React.createRef();

const TransferDetails = () => {
  const [sepaRes, setSepaRes] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const makeDepositSepa = () => {
    setLoading(true);
    api.beforeDeposit().subscribe((response) => {
      if (response.action === "success") {
        setSepaRes(response);
      } else {
        toast.error(response.error_description || response.message);
      }
      setLoading(false);
    });
  };

  React.useEffect(() => {
    makeDepositSepa();
  }, []);
  return (
    <div className="email-container TransferDetails">
      <div className="bg"> </div>

      <div className="container">
        <div style={{ paddingLeft: " 20px " }} className="header2">
          <a href="/">
            <img src={Logo} />
          </a>
        </div>
        <div
          style={{ padding: "50px 20px " }}
          className="listBox p-5"
          ref={ref}
        >
          <p className="payment_p pt-4">Bank transfer details</p>
          <ul>
            <li>
              <span className="title">Beneficiary Name:</span>
              <span>IEX OU</span>
            </li>
            <li>
              <span className="title">Beneficiary Account Number:</span>
              <span>{sepaRes.IBAN}</span>
            </li>
            <li>
              <span className="title">Beneficiary's Bank Name:</span>
              <span>Clear Junction Limited</span>
            </li>
            <li>
              <span className="title">Addressable in:</span>
              <span>SEPA</span>
            </li>
            <li>
              <span className="title">Beneficiary's Bank address:</span>
              <span>15 Kingsway, London WC2B 6UN, UK</span>
            </li>

            <li>
              <span className="title">BIC:</span>
              <span>CLJUGB21</span>
            </li>

            <li>
              <span className="title">Your Reference:</span>
              <span>{sepaRes.DESCRIPTION}</span>
            </li>
          </ul>
        </div>

        <div className="text-center download-Pdf-Wrapper">
          <Pdf
            targetRef={ref}
            x={0.5}
            y={0.5}
            scale={0.9}
            filename="cryptoiex-Bank-transfer-details.pdf"
          >
            {({ toPdf }) => <button onClick={toPdf}>Download Pdf</button>}
          </Pdf>
        </div>

        <div style={{ color: "#006eda" }} className="supportBox">
          <img src="https://i.imgur.com/eC0FYuc.png" />
          <br />
          24/7 support <br />
          hello@cryptoiex.io
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
