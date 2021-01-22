import "./SlickSlider.scss";
import "slick-carousel/slick/slick.css";
import {ISlickSliderProps} from "./ISlickSliderProps";
import React from "react";
import Slider from "react-slick";

export const SlickSlider: React.FC<ISlickSliderProps> = ({children, ...props}) => {
    return <Slider {...props}>{children}</Slider>;
};
