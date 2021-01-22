import {IdBreakpoint} from "../constants/IdBreakpoint";

class UtilBrowser {
    public searchToObject = (search: string) => {
        return search
            .substring(1)
            .split("&")
            .reduce((result: any, value: string) => {
                const parts = value.split("=");
                if (parts[0]) {
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }, {});
    };

    public isMobile = () => IdBreakpoint.Mobile > window.innerWidth;
}

export const utilBrowser = new UtilBrowser();
