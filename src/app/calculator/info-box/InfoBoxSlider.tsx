import React, {useEffect, useState} from "react";
import {configSlickSliderDesktop, configSlickSliderMobile} from "../configSlickSlider";
import {SlickSlider} from "../../slick-slider/SlickSlider";
import {utilBrowser} from "../../utils/utilBrowser";

export const InfoBoxSlider: React.FC = ({children}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(utilBrowser.isMobile());
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    const config = isMobile ? configSlickSliderMobile : configSlickSliderDesktop;

    return (
        <div className="InfoBoxes">
            <SlickSlider {...config}>{children}</SlickSlider>
        </div>
    );
};
