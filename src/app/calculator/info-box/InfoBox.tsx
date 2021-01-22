import "./InfoBox.scss";
import {IInfoBoxProps} from "./IInfoBoxProps";
// import {LabelWithIcon} from "../../generic/label-with-icon/LabelWithIcon";
import {Locale} from "../../locale/Locale";
import React from "react";

export const InfoBox: React.FC<IInfoBoxProps> = ({localeId, icon, value}) => {
    return (
        <div className="InfoBox">
            <h3 className="InfoBox__title">{localeId}</h3>
            <div className="InfoBox__value">
                {/* {icon && <LabelWithIcon image={icon} alt="icon" className="InfoBox__icon" />} */}
                <span>{value}</span>
            </div>
        </div>
    );
};
