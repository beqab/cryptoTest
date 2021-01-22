import * as React from "react";
import imgBtc from "../../assets/images/btc2.svg";
import imgEur from "../../assets/images/euro.svg";
import imgShuffle from "../../assets/images/shuffle.png";
import imgUsd from "../../assets/images/usd2.svg";

export interface IPageLogoutProps {}

export const PageTransactions: React.FC<IPageLogoutProps> = () => {
    return (
        <div className="PageTransactions">
            <div className="page_title1">
                <span>Transaction History</span>
                <span className="page_title_dots">
                    <span className="page_title_dot page_title_dot-1" />
                    <span className="page_title_dot page_title_dot-2" />
                    <span className="page_title_dot page_title_dot-3" />
                </span>
            </div>
            <div className="profile_box profile_box-thin">
                <div className="transactions">
                    <div className="transactions_row">
                        <div className="transactions_icon">
                            <img src={imgShuffle} alt="transactions" />
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgBtc} alt="bitcoin" />
                            <span className="transactions_money_amount">2.474</span>
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgUsd} alt="usd" />
                            <span className="transactions_money_amount">34.38</span>
                        </div>
                        <div className="transactions_date">
                            <span>19:04</span>
                            <span>8/15/2019</span>
                        </div>
                    </div>

                    {/* Repeated */}
                    <div className="transactions_row">
                        <div className="transactions_icon">
                            <img src={imgShuffle} alt="transactions" />
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgBtc} alt="bitcoin" />
                            <span className="transactions_money_amount">2.474</span>
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgEur} alt="usd" />
                            <span className="transactions_money_amount">34.38</span>
                        </div>
                        <div className="transactions_date">
                            <span>19:04</span>
                            <span>8/15/2019</span>
                        </div>
                    </div>
                    <div className="transactions_row">
                        <div className="transactions_icon">
                            <img src={imgShuffle} alt="transactions" />
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgBtc} alt="bitcoin" />
                            <span className="transactions_money_amount">2.474</span>
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgUsd} alt="usd" />
                            <span className="transactions_money_amount">34.38</span>
                        </div>
                        <div className="transactions_date">
                            <span>19:04</span>
                            <span>8/15/2019</span>
                        </div>
                    </div>
                    <div className="transactions_row">
                        <div className="transactions_icon">
                            <img src={imgShuffle} alt="transactions" />
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgBtc} alt="bitcoin" />
                            <span className="transactions_money_amount">2.474</span>
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgEur} alt="usd" />
                            <span className="transactions_money_amount">34.38</span>
                        </div>
                        <div className="transactions_date">
                            <span>19:04</span>
                            <span>8/15/2019</span>
                        </div>
                    </div>
                    <div className="transactions_row">
                        <div className="transactions_icon">
                            <img src={imgShuffle} alt="transactions" />
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgBtc} alt="bitcoin" />
                            <span className="transactions_money_amount">2.474</span>
                        </div>
                        <div className="transactions_money">
                            <img className="transactions_money_img" src={imgUsd} alt="usd" />
                            <span className="transactions_money_amount">34.38</span>
                        </div>
                        <div className="transactions_date">
                            <span>19:04</span>
                            <span>8/15/2019</span>
                        </div>
                    </div>
                    {/* Repeated End */}
                </div>
            </div>
        </div>
    );
};
