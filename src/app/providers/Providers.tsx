import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {ProviderAuth} from "../auth/ConsumerAuth";
import {ProviderExchange} from "../exchange/ConsumerExchange";
import {ProviderModal} from "../modal/ConsumerModal";
import {ProviderCalculator} from "../calculator/ContextCalculator";

export interface IProvidersProps {}

export const Providers: React.FC<IProvidersProps> = ({children}) => {
    return (
        <BrowserRouter basename="/">
            <ProviderModal>
                <ProviderAuth>
                    <ProviderCalculator>
                        <ProviderExchange>{children}</ProviderExchange>
                    </ProviderCalculator>
                </ProviderAuth>
            </ProviderModal>
        </BrowserRouter>
    );
};
