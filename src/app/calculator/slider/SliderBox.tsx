import "./RCSlider.scss";
import "./Slider.scss";
import "./SliderBox.scss";
import {ISliderBoxProps} from "./ISliderBoxProps";
import {Locale} from "../../locale/Locale";
import React from "react";
import Slider, {createSliderWithTooltip} from "rc-slider";

const SliderWithTooltip = createSliderWithTooltip(Slider);

export const SliderBox: React.FC<ISliderBoxProps & any> = ({
    dimensionLocaleId,
    titleLocaleId,
    max = 0,
    min = 0,
    onChange,
    value = 0,
    step,
    LabelOnCurrentValue,
    LabelOnSliderEnd,
    LabelOnSliderStart,
    tipTitle,
}) => {
    return (
        <div className="SliderBox">
            <div className="SliderBox__heading">
                <h2 className="SliderBox__title">{titleLocaleId}</h2>
            </div>
            <div className="Slider">
                <div className="Slider__track">
                    <SliderWithTooltip
                        min={min}
                        max={max}
                        onChange={(val) => onChange!(val)}
                        step={step}
                        value={value}
                        tipFormatter={(val: any) => `${val} ${tipTitle}`}
                        tipProps={{
                            placement: "top",
                            prefixCls: "rc-slider-tooltip",
                            // overlay: tipFormatter(value)
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
