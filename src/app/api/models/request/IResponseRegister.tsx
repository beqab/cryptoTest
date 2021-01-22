export interface IResponseRegister {
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
    lastname: string;
    loggedIn: boolean;
    password: string;
    userVerification: any;
    username: string;
    using2FA: boolean;
    verified: number;
    wallet: string;
}
