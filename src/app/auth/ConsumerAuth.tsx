import * as React from "react";
import {ConsumerModal} from "../modal/ConsumerModal";
import {IAuthCredentials} from "../api/models/IAuthCredentials";
import {IConsumerModal} from "../modal/IConsumerModal";
import {IResponseAuth} from "../api/models/IResponseAuth";
import {IResponseUserInfo} from "../api/models/IResponseUserInfo";
import {IdModal} from "../modal/IdModal";
import {IdVerified} from "../api/IdVerified";
import {api} from "../api/api";
import {auth2FaRequired$} from "./auth2FaRequired";
import {defaultUserResponse} from "./defaultUserResponse";
import {utilAuth} from "./utilAuth";
import {withConsumer} from "../hoc/withConsumer";
import {IBalance, Balance} from "../api/models/IResponeBalance";
import {ICard} from "../api/models/ICards";

const initial: IConsumerAuth = {
    getUserInfo: () => undefined,
    isLoggedIn: false,
    logout: () => undefined,
    setUsing2FA: (value: boolean) => undefined,
    setVerified: (value: IdVerified) => undefined,
    try2FaAuth: () => undefined,
    tryAuth: () => undefined,
    user: defaultUserResponse,
    balance: {
        USD: {
            balance: 0,
        },
        EUR: {
            balance: 0,
        },
        BITCOIN: {
            balance: 0,
        },
    },
    setBalance: (user_balances: IBalance[]) => {},
    addCard: (card) => {},
    deleteCard: (id) => {},
};

const ContextAuth = React.createContext(initial);
ContextAuth.displayName = "ContextAuth";

export const ConsumerAuth = ContextAuth.Consumer;

export interface IProviderAuthProps extends IConsumerModal {}
export interface IProviderAuthState {
    accessToken: string;
    isLoggedIn: boolean;
    mfaToken: string;
    user: IResponseUserInfo;
    balance: Balance;
}
export interface IConsumerAuth {
    getUserInfo: () => void;
    isLoggedIn: boolean;
    logout: () => void;
    setUsing2FA: (value: boolean) => void;
    setVerified: (value: IdVerified) => void;
    try2FaAuth: (code: string, success?: (data: IResponseAuth) => void, error?: (data: IResponseAuth) => void) => void;
    tryAuth: (
        credentials: IAuthCredentials,
        success?: (data: IResponseAuth) => void,
        error?: (data: IResponseAuth) => void,
    ) => void;
    user: IResponseUserInfo;
    balance: Balance;
    setBalance: (user_balances: IBalance[]) => void;
    addCard: (card: ICard) => void;
    deleteCard: (id: number) => void;
}

class ProviderAuthInner extends React.PureComponent<IProviderAuthProps, IProviderAuthState> {
    public state: IProviderAuthState;

    constructor(props: IProviderAuthProps) {
        super(props);

        const accessToken = localStorage.getItem("access_token") || "";

        this.state = {
            accessToken,
            isLoggedIn: utilAuth.isTokenValid(accessToken),
            mfaToken: "",
            user: defaultUserResponse,
            balance: {
                USD: {
                    balance: 0,
                },
                EUR: {
                    balance: 0,
                },
                BITCOIN: {
                    balance: 0,
                },
            },
        };
    }

    public componentDidMount(): void {
        const {open} = this.props;

        auth2FaRequired$.subscribe((data) => {
            if (data) {
                open(IdModal.Approve2Fa);
            }
        });

        if (this.state.isLoggedIn) {
            this.getUserInfo();
        }
    }

    public render() {
        const {children} = this.props;
        const {isLoggedIn, user, balance} = this.state;

        const context: IConsumerAuth = {
            getUserInfo: this.getUserInfo,
            isLoggedIn,
            logout: this.logout,
            setUsing2FA: this.setUsing2FA,
            setVerified: this.setVerified,
            try2FaAuth: this.try2FaAuth,
            tryAuth: this.tryAuth,
            user,
            balance: balance,
            setBalance: this.setBalance,
            addCard: this.addCard,
            deleteCard: this.deleteCard,
        };

        return <ContextAuth.Provider value={context}>{children}</ContextAuth.Provider>;
    }

    private tryAuth = (
        credentials: IAuthCredentials,
        success?: (data: IResponseAuth) => void,
        error?: (data: IResponseAuth) => void,
    ): void => {
        const {open} = this.props;

        utilAuth.tryAuth(credentials).subscribe((data) => {
            if (!data) {
                alert("Something went wrong. Try Again");
                return;
            }

            if (data.error === "mfa_required") {
                open(IdModal.Approve2Fa);

                this.setState({
                    ...this.state,
                    mfaToken: data.mfa_token,
                });
                return;
            }

            // any other unhandled errors
            if (data.error) {
                if (error) {
                    error(data);
                }
                return;
            }

            // success
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);

                this.getUserInfo();

                if (success) {
                    success(data);
                }
            }
        });
    };

    private try2FaAuth = (
        mfaCode: string,
        success?: (data: IResponseAuth) => void,
        error?: (data: IResponseAuth) => void,
    ) => {
        const {mfaToken} = this.state;

        utilAuth.login2Fa(mfaCode, mfaToken).subscribe((data) => {
            if (!data) {
                alert("Something went wrong. Try Again");
                return;
            }

            // any other unhandled errors
            if (data.error) {
                if (error) {
                    error(data);
                }
                return;
            }

            // success
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);

                this.getUserInfo();

                if (success) {
                    success(data);
                }
            }
        });
    };

    private getUserInfo = () => {
        api.getInfo().subscribe((userInfo) => {
            if (userInfo.data !== undefined) {
                this.setState({
                    ...this.state,
                    isLoggedIn: true,
                    user: {
                        ...this.state.user,
                        ...userInfo,
                    },
                    balance: userInfo.data.userBalances.reduce((obj: any, item: IBalance) => {
                        return {
                            ...obj,
                            [item.type]: {
                                balance: item.balance,
                            },
                        };
                    }, {}),
                });
            } else {
                localStorage.removeItem("access_token");

                this.setState({
                    ...this.state,
                    isLoggedIn: false,
                    user: {
                        ...this.state.user,
                    },
                });
            }
        });
    };

    private setUsing2FA = (using2FA: boolean) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                data: {
                    ...this.state.user.data,
                    using2FA,
                },
            },
        });
    };

    private setBalance = (userBalances: IBalance[]) => {
        console.log(userBalances);
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                data: {
                    ...this.state.user.data,
                    userBalances,
                },
            },
            balance: userBalances.reduce((obj: any, item: IBalance) => {
                return {
                    ...obj,
                    [item.type]: {
                        balance: item.balance,
                    },
                };
            }, {}),
        });
    };

    private addCard = (card: ICard) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                data: {
                    ...this.state.user.data,
                    userCards: [...this.state.user.data.userCards, card],
                },
            },
        });
    };

    private deleteCard = (id: number) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                data: {
                    ...this.state.user.data,
                    userCards: this.state.user.data.userCards.filter((card) => card.id !== id),
                },
            },
        });
    };

    private setVerified = (verified: IdVerified) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                data: {
                    ...this.state.user.data,
                    verified,
                },
            },
        });
    };

    private logout = () => {
        localStorage.removeItem("access_token");
        this.setState({
            ...this.state,
            accessToken: "",
            isLoggedIn: false,
        });
    };
}

export const ProviderAuth = withConsumer(ConsumerModal)(ProviderAuthInner);
