import "./Label.scss";
import {ILabelProps} from "./ILabelProps";
import {IdColor} from "../../constants/IdColor";
import {Locale} from "../../locale/Locale";
import React from "react";

export const Label: React.FC<ILabelProps> = ({color = IdColor.Success, localeId}) => {
    const classNameRoot = `Label Label--${color}`;

    return (
        <div className={classNameRoot}>
            <Locale id={localeId} />
        </div>
    );
};
