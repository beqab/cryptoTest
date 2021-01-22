import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {IdPath} from "../router/IdPath";
import {RouterProps} from "react-router";
import {useEffect} from "react";
import {withConsumer} from "../hoc/withConsumer";

export interface IPageLogoutProps extends IConsumerAuth, RouterProps {}

const PageLogoutInner: React.FC<IPageLogoutProps> = ({logout, history}) => {
    useEffect(() => {
        logout();
        history.push(IdPath.Home);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="PageLogout" />;
};

export const PageLogout = withConsumer(ConsumerAuth)(PageLogoutInner);
