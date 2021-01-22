import {IGenericProps} from "../IGenericProps";
import {ILocaleIdProp} from "../../locale/ILocaleIdProp";
import {IdColor} from "../../constants/IdColor";
import {IdSize} from "../../constants/IdSize";

export interface IButtonProps extends IGenericProps, ILocaleIdProp {
    color?: IdColor;
    disabled?: boolean;
    icon?: string;
    onClick?: () => void;
    size?: IdSize;
    type?: "button" | "submit" | "reset";
}
