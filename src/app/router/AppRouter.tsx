import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {Route, Switch} from "react-router-dom";
import {IdPath} from "./IdPath";
import {PageCreateCard} from "../pages/CreateCard";
import {PageAbout} from "../pages/PageAbout";
import {PageActivate} from "../pages/PageActivate";
import {PageContact} from "../pages/PageContact";
import {PageDashboard} from "../pages/PageDashboard";
// import {PageDeposit} from "../pages/PageDeposit";
import {PageFaq} from "../pages/PageFaq";
import {PageForget} from "../pages/PageForget";
import {PageHome} from "../pages/PageHome";
import {PageIexOu} from "../pages/PageIexOu";
import {PageLogout} from "../pages/PageLogout";
import {PagePrivacyPolicy} from "../pages/PagePrivacyPolicy";
import {PageProfile} from "../pages/PageProfile";
import {PageRefundPolicy} from "../pages/PageRefundPolicy";
import {PageSupport} from "../pages/PageSupport";
import {PageTerms} from "../pages/PageTerms";
import {PageVerification} from "../pages/PageVerification";
import {PageVerification2} from "../pages/PageVerification2";
import PageVerification3 from "../pages/PageVerification3";
import {PrivateRoute} from "./PrivateRoute";
import {withConsumer} from "../hoc/withConsumer";
import {PageDeposit} from "../pages/PageDeposit2";
import {PageBalance} from "../pages/PageBalance";
import Fees from "../pages/Fees";
import TransferDetails from "../pages/transferDetails";
import Limits from "../pages/Limits";
import {PageWithdraw} from "../pages/PageWithdraw";

export interface IAppRouterProps extends IConsumerAuth {}

const AppRouterInner: React.FC<IAppRouterProps> = ({isLoggedIn}) => {
    return (
        <Switch>
            <Route path={IdPath.Home} exact={true} component={PageHome} />
            <Route path={IdPath.About} exact={true} component={PageAbout} />
            <Route path={IdPath.Terms} exact={true} component={PageTerms} />
            <Route path={IdPath.Privacy} exact={true} component={PagePrivacyPolicy} />
            <Route path={IdPath.Refund} exact={true} component={PageRefundPolicy} />
            <Route path={IdPath.IexOu} exact={true} component={PageIexOu} />
            <Route path={IdPath.Faq} exact={true} component={PageFaq} />
            <Route path={IdPath.Contact} exact={true} component={PageContact} />
            <Route path={IdPath.Logout} exact={true} component={PageLogout} />
            <Route path={IdPath.Forget} exact={true} component={PageForget} />
            <Route path={IdPath.Activate} exact={true} component={PageActivate} />
            <Route path={IdPath.Balance} exact={true} component={PageBalance} />
            <Route path={IdPath.Limits} exact={true} component={Limits} />
            <Route path={IdPath.Fees} exact={true} component={Fees} />

            <PrivateRoute
                path={IdPath.transferDetails}
                exact={true}
                component={TransferDetails}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Support}
                exact={true}
                component={PageSupport}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Dashboard}
                exact={true}
                component={PageDashboard}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Verification}
                exact={true}
                component={PageVerification3}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.VerificationOnfido}
                exact={true}
                component={PageVerification2}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Withdraw}
                exact={true}
                component={PageWithdraw}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Profile}
                exact={true}
                component={PageProfile}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            {/* <PrivateRoute
                path={IdPath.Deposit}
                exact={true}
                component={PageDeposit}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            /> */}
            <PrivateRoute
                path={IdPath.Transactions}
                exact={true}
                component={PageBalance}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.Deposit}
                exact={true}
                component={PageDeposit}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
            <PrivateRoute
                path={IdPath.CreateCard}
                exact={true}
                component={PageCreateCard}
                fallbackPath={IdPath.Home}
                canActive={() => isLoggedIn}
            />
        </Switch>
    );
};

export const AppRouter = withConsumer(ConsumerAuth)(AppRouterInner);
