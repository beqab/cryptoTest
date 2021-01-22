import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {auth2FaRequired$} from "../auth/auth2FaRequired";
import {utilEnvironment} from "../utils/utilEnvironment";

class HttpClient {
    private serverAddress = utilEnvironment.get("SERVER_ADDR");

    get<T extends Object = Object>(url: string, headers?: any): Observable<T> {
        return ajax.get
            .apply(undefined, [`${this.serverAddress}${url}`, headers])
            .pipe(catchError(this.catchError), map(this.map));
    }

    post<T extends Object = Object>(url: string, body?: any, headers?: any): Observable<T> {
        return ajax.post
            .apply(undefined, [`${this.serverAddress}${url}`, body, headers])
            .pipe(catchError(this.catchError), map(this.map));
    }

    private catchError = (err: any, caught: Observable<any>): Observable<any> => {
        // eslint-disable-next-line no-console
        console.error("httpClient Error:", err.response);
        return of(err);
    };

    private map = (data: any) => {
        const {response} = data;

        // if (response.action === "error" && response.ERROR_CODE === "ACTIVATE_2FA") {
        //     auth2FaRequired$.next(true);
        //     throwError({action: "error"});
        // }

        return data.response;
    };
}

export const httpClient = new HttpClient();
