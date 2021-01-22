import {ISliderLabelProps} from "../slider/ISliderLabelProps";
import {Locale} from "../../locale/Locale";
import React from "react";

export const LabelUsd: React.FC<ISliderLabelProps> = ({value}) => (
    <span>
        {value}{" "}
        <b>
            <Locale id="usd" />
        </b>
    </span>
);
