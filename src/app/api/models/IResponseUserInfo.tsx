import {IResponseAction} from "./IResponseAction";
import {IdVerified} from "../IdVerified";
import {IBalance} from "./IResponeBalance";
import {ICard} from "./ICards";

export interface IResponseUserInfo extends IResponseAction {
    data: {
        accountExpired: boolean;
        accountLocked: boolean;
        accountNonExpired: boolean;
        accountNonLocked: boolean;
        authenticated2Fa: boolean;
        backupCode: number;
        balance: string;
        credentialsExpired: boolean;
        credentialsNonExpired: boolean;
        enabled: boolean;
        filePrefix: string;
        firstname: string;
        id: number;
        identifier_id: number;
        lastname: string;
        loggedIn: boolean;
        password: boolean;
        userVerification: {
            additionalPicture: string;
            backPicture: string;
            id: number;
            mainPicture: number;
            user_id: number;
        };
        username: string;
        using2FA: boolean;
        verified: IdVerified;
        onfido_status: string | null;
        wallet: string;
        userBalances: IBalance[];
        userCards: ICard[];
    };
    googleCaptcha: string;
}
