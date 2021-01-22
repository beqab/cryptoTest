import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {ConsumerModal} from "../modal/ConsumerModal";
import {IConsumerModal} from "../modal/IConsumerModal";
import {IdModal} from "../modal/IdModal";
import {PageHome} from "./PageHome";
import {RouteComponentProps} from "react-router";
import {compose} from "recompose";
import {useEffect} from "react";
import {withConsumer} from "../hoc/withConsumer";

export interface IPageForgetProps extends RouteComponentProps, IConsumerModal, IConsumerAuth {}

const PageForgetInner: React.FC<IPageForgetProps> = ({history, location, open}) => {
    useEffect(() => {
        open(IdModal.ChangePassword);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <PageHome history={history} />;
};

const enhance = compose<any, any>(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export const PageForget = enhance(PageForgetInner);
