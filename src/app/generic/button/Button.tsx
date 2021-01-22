import "./Button.scss";
import {IButtonProps} from "./IButtonProps";
import {IdColor} from "../../constants/IdColor";
import {IdSize} from "../../constants/IdSize";
import {Locale} from "../../locale/Locale";
import React from "react";

const generateClassNameFromProps = ({className, color, disabled, size}: Partial<IButtonProps>): string => {
    return `Button Button--${color} Button--${size}${className ? ` ${className}` : ""}`;
};

export const Button: React.FC<IButtonProps> = ({
    className,
    color = IdColor.Primary,
    disabled = false,
    icon,
    localeId,
    onClick,
    size = IdSize.Medium,
    type,
}) => {
    return (
        <button
            className={generateClassNameFromProps({className, color, disabled, size})}
            disabled={disabled}
            onClick={() => {
                if (onClick && !disabled) {
                    onClick();
                }
            }}
            type={type}
        >
            {icon && <img className="Button__icon" src={icon} alt={localeId} />}
            <span>
                <Locale id={localeId} />
            </span>
        </button>
    );
};
