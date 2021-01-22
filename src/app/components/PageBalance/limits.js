import React from "react";
import {ConsumerAuth} from "../../auth/ConsumerAuth";
import {withConsumer} from "../../hoc/withConsumer";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {compose} from "recompose";
import {IdModal} from "../../modal/IdModal";
import {withRouter} from "react-router";

const limits = ({isLoggedIn, open, history}) => {
    const increaseLimitHandler = () => {
        !isLoggedIn ? open(IdModal.LoginPrompt) : history.push("/verification");
    };

    return (
        <div className="feesTable container">
            <div className="row mb-15 tableTitles d-sm-none">
                <div className="col-5">Limits</div>
                <div className="col-2">Daily deposit</div>
                <div className="col-2">Daily withdrawal</div>
            </div>
            <div className="row py-15 borderTop">
                <div className="col-5 col-sm-12 pr-10">
                    <div className="title">Starter</div>
                    <div className="text">
                        Make deposits totaling $100 for the account lifetime, withdrawals - up to $100 daily.
                    </div>
                </div>
                <div className="col-2 col-sm-12 d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily deposit</div>
                    <div> $100.00</div>
                </div>
                <div className="col-2 col-sm-12   d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily withdrawal</div>
                    <div> $100.00</div>
                </div>
                <div className="col-3 col-sm-12  d-flex align-items-center justify-end button">
                    <button onClick={increaseLimitHandler}>Increase Limit</button>
                </div>
            </div>
            <div className="row py-15 borderTop">
                <div className="col-5 col-sm-12 pr-10">
                    <div className="title">Intermediate</div>
                    <div className="text">
                        Level up your daily limits: deposits — up to $3,000.00, withdrawals — up to $10,000.00.
                    </div>
                </div>
                <div className="col-2 col-sm-12 d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily deposit</div>
                    <div> $3,000.00</div>
                </div>
                <div className="col-2 col-sm-12   d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily withdrawal</div>
                    <div>$10,000.00</div>
                </div>
                <div className="col-3 col-sm-12  d-flex align-items-center justify-end button">
                    <button onClick={increaseLimitHandler}>Increase Limit</button>
                </div>
            </div>
            <div className="row py-15 borderTop">
                <div className="col-5 col-sm-12 pr-10">
                    <div className="title">Advanced</div>
                    <div className="text">
                        Unlock bank transfers and get advanced daily limits: deposits — up to $10,000.00, withdrawals —
                        up to $30,000.00.
                    </div>
                </div>
                <div className="col-2 col-sm-12 d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily deposit</div>
                    <div> $10,000.00</div>
                </div>
                <div className="col-2 col-sm-12   d-flex align-items-center justify-center dailyWithdrawal">
                    <div className="d-none d-sm-flex">Daily withdrawal</div>
                    <div> $30,000.00</div>
                </div>
                <div className="col-3 col-sm-12  d-flex align-items-center justify-end button">
                    <button onClick={increaseLimitHandler}>Increase Limit</button>
                </div>
            </div>
        </div>
    );
};

const enhance = compose(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export default withRouter(enhance(limits));
