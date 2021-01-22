export interface IResponseMfa {
    error: string; // mfa_required
    error_description: string;
    mfa_token: string;
}
