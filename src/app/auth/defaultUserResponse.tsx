import {IResponseUserInfo} from "../api/models/IResponseUserInfo";
import {IdVerified} from "../api/IdVerified";

export const defaultUserResponse: IResponseUserInfo = {
    action: "success",
    data: {
        accountExpired: false,
        accountLocked: false,
        accountNonExpired: false,
        accountNonLocked: false,
        authenticated2Fa: false,
        backupCode: -1,
        balance: "0",
        credentialsExpired: false,
        credentialsNonExpired: false,
        enabled: false,
        filePrefix: "",
        firstname: "",
        id: -1,
        identifier_id: -1,
        lastname: "",
        loggedIn: false,
        password: false,
        userVerification: {
            additionalPicture: "",
            backPicture: "",
            id: -1,
            mainPicture: -1,
            user_id: -1,
        },
        username: "",
        using2FA: false,
        verified: IdVerified.Unverified,
        onfido_status: null,
        wallet: "",
        userBalances: [],
        userCards: [],
    },
    googleCaptcha: "",
};