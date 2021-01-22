import React from "react";

const fees = (props) => {
    return (
        <div className="limitsContainer">
            <table className="table  limits-table">
                <thead>
                    <tr className="border-bottom">
                        <td style={{width: "165px"}}>
                            <b> Currency </b>
                        </td>
                        <td style={{width: "234px"}} className="payment">
                            <b> Payment method </b>
                        </td>
                        <td style={{width: "169px"}} className="deposit">
                            <b> Deposit</b>
                        </td>
                        <td className="withdrawal">
                            <b>Withdrawal </b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="symbol-line">
                        <td className="symbol border-line" colspan="1" rowspan="6">
                            <div className=" d-flex align-center  flex-column ">
                                <span className="balance-table-icon balance-table-icon-eur"></span>
                                <span className="currency-text "> &nbsp;EUR</span>
                            </div>
                        </td>

                        {/* <td className="">
                        <span className="balance-table-icon balance-table-icon-eur"></span>

                        <span className="ml-20">EUR</span>
                    </td> */}
                    </tr>
                    <tr>
                        <td className="payment font14 greyFont border-line">VISA</td>
                        <td className="deposit font14 border-line">1.5% + 5 €</td>

                        <td className="withdrawal border-line">
                            <div className="d-flex">
                                <div className="withdrawal-block-title mr-20 ">
                                    <span className="greyFont font12"> Service charge: </span>
                                    <div className="font14">2.9% </div>
                                </div>
                                <div className="withdrawal-block-title">
                                    <span className="greyFont font12 "> Commission: </span>
                                    <div className="font14">+ 5 €</div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="payment font14 greyFont ">MasterCard</td>
                        <td className="deposit font14">1.5% + 5 €{/* <td></td>{" "} */}</td>
                        <td className="withdrawal">
                            <div className="d-flex">
                                <div className="withdrawal-block-title mr-20">
                                    <div className="greyFont font12"> Service charge:</div>
                                    <span className="font14">2.9%</span>
                                </div>
                                <div className="withdrawal-block-title">
                                    <div className="greyFont font12">Commission:</div>
                                    <span className="font14">+ 5 €</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="font14">
                        {/* <td className="payment greyFont">skrill</td> */}
                        {/* <td className="deposit">3.99%</td> */}
                        {/* <td className="withdrawal">1%</td> */}
                    </tr>
                    <tr className="font14">
                        <td className="payment greyFont font14 ">SEPA</td>
                        <td className="deposit"> 0 € </td>
                        <td className="withdrawal">0.3% + 10 €</td>
                    </tr>
                    <tr className="font14">
                        {/* <td className="payment greyFont ">ACH</td> */}
                        {/* <td className="deposit">€ 0</td> */}
                        {/* <td className="withdrawal">€ 0</td> */}
                    </tr>
                    <tr> </tr>
                    <tr className="symbol-line">
                        <td className="symbol border-line" style={{height: "100px"}} colspan="1" rowspan="6">
                            <div className=" d-flex align-center flex-column ">
                                <span className="balance-table-icon balance-table-icon-btc"></span>

                                <span className="currency-text ">BTC</span>
                            </div>
                        </td>

                        {/* <td className="">
                        <span className="balance-table-icon balance-table-icon-eur"></span>

                        <span className="ml-20">EUR</span>
                    </td> */}
                    </tr>
                    <tr style={{height: "100px"}}>
                        <td className="payment font14 greyFont border-line"></td>
                        <td className="deposit font14 border-line">
                            <div className="greyFont font12">Minimum deposit:</div>
                            <span className="font14"> 0.001 BTC</span>
                        </td>

                        <td className="withdrawal border-line">
                            <div className="d-flex">
                                <div className="withdrawal-block-title mr-20">
                                    <div className="greyFont font12"> Minimum withdrawal:</div>
                                    <span className="font14"> 0.002 BTC</span>
                                </div>
                                <div className="withdrawal-block-title">
                                    <div className="greyFont font12">Withdrawal fee</div>
                                    <span className="font14">0.0005 BTC</span>
                                </div>
                            </div>
                            {/* <div className="d-flex"> */}
                            {/* <div className="withdrawal-block-title mr-20 ">
                                    <span className="greyFont font12"> Service charge: </span>
                                    <div className="font14">up to 3% + € 1.20 </div>
                                </div>
                                <div className="withdrawal-block-title">
                                    <span className="greyFont font12 "> Commission: </span>
                                    <div className="font14">up to € 3.80</div>
                                </div> */}
                            {/* </div> */}
                        </td>
                    </tr>

                    {/* <tr> */}
                    {/* <td className="payment font14 greyFont ">MasterCard</td>
                        <td className="deposit font14">
                            2.99%
                        </td>
                        <td className="withdrawal">
                            <div className="d-flex">
                                <div className="withdrawal-block-title mr-20">
                                    <div className="greyFont font12"> Service charge:</div>
                                    <span className="font14">up to 1.8% + € 1.20</span>
                                </div>
                                <div className="withdrawal-block-title">
                                    <div className="greyFont font12">Commission:</div>
                                    <span className="font14">up to 1.2% + € 3.80</span>
                                </div>
                            </div>
                        </td> */}
                    {/* </tr> */}
                    {/* <tr className="font14"> */}
                    {/* <td className="payment greyFont">skrill</td>
                        <td className="deposit">3.99%</td>
                        <td className="withdrawal">1%</td> */}
                    {/* </tr>
                    <tr className="font14"> */}
                    {/* <td className="payment greyFont font14 ">Bank transfer</td>
                        <td className="deposit">€ 0</td>
                        <td className="withdrawal">0.3% + € 25.00</td> */}
                    {/* </tr>
                    <tr className="font14"> */}
                    {/* <td className="payment greyFont ">ACH</td>
                        <td className="deposit">€ 0</td>
                        <td className="withdrawal">€ 0</td> */}
                    {/* </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default fees;
