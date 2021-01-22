export interface IResponseError {
    error: string;
    error_description: string;
}

export interface IResponseSuccess {
    success: boolean;
}

export interface IResponseActivate {
    action: "success" | "error";
    verified: boolean;
}
