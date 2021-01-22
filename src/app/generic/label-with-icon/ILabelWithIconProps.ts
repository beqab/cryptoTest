import {IClassNamesProps} from "../IClassNamesProps";
import {IGenericProps} from "../IGenericProps";
import {IdSize} from "../../constants/IdSize";

interface ILabelWithIconClassNames {
    root: string;
    image: string;
}

export interface ILabelWithIconProps extends IGenericProps, IClassNamesProps<ILabelWithIconClassNames> {
    alt?: string;
    image: string;
    size?: IdSize;
}
