import {I2FaAuthParams} from "../api/models/request/I2FaAuthParams";
import {IAuthCredentials} from "../api/models/IAuthCredentials";
import {IAuthParams} from "../api/models/request/IAuthParams";
import {IResponseAuth} from "../api/models/IResponseAuth";
import {Observable} from "rxjs";
import {OutgoingHttpHeaders} from "http";
import {api} from "../api/api";
import {utilJwt} from "../utils/utilJwt";

class UtilAuth {
    private defaultAuthHeaders: OutgoingHttpHeaders = {
        Authorization: "Basic YXBpLWNsaWVudDo2cTAwdDVhdDU=",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    private defaultAuthParams: IAuthParams = {
        client_id: "api-client",
        grant_type: "password",
    };

    private default2FaParams: Partial<I2FaAuthParams> = {
        grant_type: "mfa",
    };

    public tryAuth = (credentials: IAuthCredentials): Observable<IResponseAuth> => {
        const body = {
            ...this.defaultAuthParams,
            ...credentials,
        };

        return api.login(body, this.defaultAuthHeaders);
    };

    public login2Fa = (mfaCode: string, mfaToken: string): Observable<IResponseAuth> => {
        const body = {
            ...this.default2FaParams,
            mfa_code: mfaCode,
            mfa_token: mfaToken,
        };

        return api.login(body, this.defaultAuthHeaders);
    };

    public isTokenValid = (accessToken: string): boolean => {
        if (accessToken === "") {
            return false;
        }

        return utilJwt.isExpired(accessToken);
    };
}

export const utilAuth = new UtilAuth();
