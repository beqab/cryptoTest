import {ISliderLabelProps} from "../slider/ISliderLabelProps";
import {Locale} from "../../locale/Locale";
import React from "react";

export const LabelMonths: React.FC<ISliderLabelProps> = ({value}) => {
    const isTwoWeeks = value === 0.5;
    const finalValue = isTwoWeeks ? 2 : value;
    const localeId = isTwoWeeks ? "weeks" : "months";

    return (
        <span>
            {finalValue}{" "}
            <b>
                <Locale id={localeId} />
            </b>
        </span>
    );
};
