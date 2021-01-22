import {IdEnvironment} from "../constants/IdEnvironment";

class UtilEnvironment {
    public get current() {
        return process.env.REACT_APP_ENV || process.env.NODE_ENV;
    }

    public isEnvironment = (env: IdEnvironment) => this.current === env;

    public isTest = () => process.env.NODE_ENV === IdEnvironment.Test;
    public isDevelopment = () => this.isEnvironment(IdEnvironment.Development);
    public isIntegration = () => this.isEnvironment(IdEnvironment.Integration);
    public isProduction = () => this.isEnvironment(IdEnvironment.Production);

    public get = (id: string) => process.env[`REACT_APP_${id}`];

    public get publicUrl() {
        return process.env.PUBLIC_URL;
    }
}

export const utilEnvironment = new UtilEnvironment();
