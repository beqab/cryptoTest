import React, {useState, useEffect} from "react";
import {utilBrowser} from "./utilBrowser";

export const useUtilBrowser = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(utilBrowser.isMobile());

        const onResize = () => {
            setIsMobile(utilBrowser.isMobile());
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    return isMobile;
};
