import {IEmailField} from "./models/request/IEmailField";
import {IRequestContact} from "./models/request/IRequestContact";
import {IRequestUpdatePassword} from "./models/request/IRequestUpdatePassword";
import {IResponseAction} from "./models/IResponseAction";
import {IResponseActivate} from "./models/IResponseError";
import {IResponseAuth} from "./models/IResponseAuth";
import {IResponseBtcToEur} from "./models/IResponseBtcToEur";
import {IResponseBtcToUsd} from "./models/IResponseBtcToUsd";
import {IResponseRegister} from "./models/request/IResponseRegister";
import {IResponseRequestRecover} from "./models/IResponseRequestRecover";
import {IResponseUserInfo} from "./models/IResponseUserInfo";
import {IUserParams} from "./models/request/IUserParams";
import {Observable} from "rxjs";
import {OutgoingHttpHeaders} from "http";
import {httpClient} from "../http/httpClient";
import {IResponeBalance} from "./models/IResponeBalance";
import {IResponseExchange} from "./models/IResponseExchange";
import {IResponseTransactions} from "./models/IResponseTransactions";
import {IResponseSendBtc} from "./models/IResponseSendBtc";
import {IdCurrency} from "./constants/IdCurrency";
import {IResponeCreateCard, IResponeDeleteCard} from "./models/ICards";
import {IResponseDeposit} from "./models/IResponseDeposit";

class Api {
    private headers = (): OutgoingHttpHeaders => ({
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    /* endpoints */

    public getExchangeBtcEur(): Observable<IResponseBtcToEur> {
        return httpClient.post<IResponseBtcToEur>("api/v1/public/currency/exchange/btc-to-eur", {});
    }

    public getExchangeBtcUsd(): Observable<IResponseBtcToUsd> {
        return httpClient.post<IResponseBtcToUsd>("api/v1/public/currency/exchange/btc-to-usd", {});
    }

    public login(body: any, headers: OutgoingHttpHeaders): Observable<IResponseAuth> {
        return httpClient.post<IResponseAuth>("oauth/token", body, headers);
    }

    public register(user: IUserParams): Observable<IResponseRegister & IResponseAction> {
        return httpClient.post<IResponseRegister & IResponseAction>("api/v1/public/user/register", user);
    }

    public activateAccount(token: string): Observable<IResponseActivate> {
        return httpClient.post<IResponseActivate>("api/v1/public/user/activate", {token});
    }

    public requestRecover(user: IEmailField): Observable<IResponseRequestRecover> {
        return httpClient.post<IResponseRequestRecover>("api/v1/public/user/recover", user);
    }

    public recoverUpdatePassword(body: IRequestUpdatePassword): Observable<{action: "error" | "success"}> {
        return httpClient.post<{action: "error" | "success"}>("api/v1/public/user/recover/submit", body);
    }

    public changePassword(oldPassword: string, newPassword: string): Observable<any> {
        return httpClient.post<any>(
            `api/v1/user/update?oldPassword=${oldPassword}&password=${newPassword}`,
            {},
            this.headers(),
        );
    }

    // 2FA
    public disable2Fa(code: string): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/disable2Fa", {code}, this.headers());
    }

    public activate2Fa(code: string): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/activate2Fa", {code}, this.headers());
    }

    public contact(data: IRequestContact, passHeaders: boolean): Observable<IResponseAction> {
        const headers = passHeaders ? this.headers() : {};

        return httpClient.post<IResponseAction>(
            "api/v1/public/notification/send",
            {type: "", subject: "", ...data},
            headers,
        );
    }

    public getInfo(): Observable<IResponseUserInfo> {
        return httpClient.post<IResponseUserInfo>("api/v1/user/me", {}, this.headers());
    }

    public verification(data: any): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/verification/store", data, this.headers());
    }

    public getOnFidoToken(): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/onfido/commit", {}, this.headers());
    }

    public checkOnFido(data: any): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/onfido/check", data, this.headers());
    }

    public additionaldata(data: any): Observable<IResponseAction> {
        return httpClient.post<IResponseAction>("api/v1/user/additionaldata/store", data, this.headers());
    }

    /**
     * @Deprecated use getInfo() instead
     */
    public getBalance(): Observable<IResponeBalance> {
        return httpClient.post<IResponeBalance>("api/v1/user/balance-all", {}, this.headers());
    }

    public getCountrys(): Observable<any> {
        return httpClient.post("api/v1/public/countries");
    }

    public exchange(from: string, to: string, amount: number): Observable<IResponseExchange> {
        return httpClient.post(
            `api/v1/user/${from.toLowerCase()}-to-${to.toLowerCase()}`,
            {
                amount,
            },
            this.headers(),
        );
    }

    public transactions(): Observable<IResponseTransactions> {
        return httpClient.post(`api/v1/user/transactions`, {}, this.headers());
    }

    public sendBtc(to: string, amount: number): Observable<IResponseSendBtc> {
        return httpClient.post(`api/v1/user/send-btc`, {to, amount}, this.headers());
    }

    public createCard(data: any): Observable<IResponeCreateCard> {
        return httpClient.post(`api/v1/user/card/create`, data, this.headers());
    }

    public deleteCard(data: any): Observable<IResponeDeleteCard> {
        return httpClient.post(`api/v1/user/card/delete`, data, this.headers());
    }

    public deposit(cardNumber: string, amount: number, currency: IdCurrency): Observable<any> {
        return httpClient.post(
            "api/v1/user/deposit",
            {
                cardNumber,
                amount,
                currency: currency.toUpperCase(),
            },
            this.headers(),
        );
    }

    public beforeDeposit(): Observable<IResponseDeposit> {
        return httpClient.post("api/v1/user/before/deposit/", null, this.headers());
    }

    public withdraw(cardNumber: string, amount: number, currency: IdCurrency): Observable<IResponseDeposit> {
        return httpClient.post(
            "api/v1/user/withdraw",
            {
                cardNumber,
                amount,
                currency: currency.toLowerCase(),
            },
            this.headers(),
        );
    }
}

export const api = new Api();
