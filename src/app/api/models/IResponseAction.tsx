export interface IResponseAction {
    action: "error" | "success";
    message?: string;
    ERROR_CODE?: "ACTIVATE_2FA" | "EMAIL_UNIQUE_FAILED";
}
