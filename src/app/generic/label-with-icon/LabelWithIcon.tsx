import "./LabelWithIcon.scss";
import {ILabelWithIconProps} from "./ILabelWithIconProps";
import {IdSize} from "../../constants/IdSize";
import React from "react";

export const LabelWithIcon: React.FC<ILabelWithIconProps> = ({
    alt = "",
    className = "",
    classNames = {},
    image,
    size = IdSize.Medium,
}) => {
    const classNameRoot = `LabelWithIcon LabelWithIcon--${size} ${className} ${
        classNames.root ? ` ${classNames.root}` : ""
    }`;
    const classNameImage = `LabelWithIcon__image${classNames.image ? ` ${classNames.image}` : ""}`;

    return (
        <div className={classNameRoot}>
            <img src={image} alt={alt} className={classNameImage} />
        </div>
    );
};
