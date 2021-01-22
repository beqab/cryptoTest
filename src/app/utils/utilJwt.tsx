const jwtDecode = require("jwt-decode");

class UtilJwt {
    public isExpired = (accessToken: string) => {
        if (!accessToken || accessToken === "") {
            return true;
        }

        const decodedToken = jwtDecode(accessToken);
        return !(decodedToken && decodedToken.exp < Date.now().valueOf() / 1000);
    };
}

export const utilJwt = new UtilJwt();
