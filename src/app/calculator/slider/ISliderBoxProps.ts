import {ISliderLabelProps} from "./ISliderLabelProps";
import {IdLocale} from "../../locale/IdLocale";
import React from "react";
// import SliderProps from "rc-slider";

export interface ISliderBoxProps {
    dimensionLocaleId: IdLocale;
    titleLocaleId: IdLocale;
    LabelOnCurrentValue?: React.FC<ISliderLabelProps>;
    LabelOnSliderEnd?: React.FC<ISliderLabelProps>;
    LabelOnSliderStart?: React.FC<ISliderLabelProps>;
}
