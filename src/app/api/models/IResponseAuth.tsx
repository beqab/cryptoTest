import {IResponseError} from "./IResponseError";
import {IResponseMfa} from "./IResponseMfa";

export interface IResponseAuth extends IResponseError, IResponseMfa {
    access_token: string;
    expires_in: number;
    jti: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}
