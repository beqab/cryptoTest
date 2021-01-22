import {IClassNamesProps} from "../generic/IClassNamesProps";
import {IGenericProps} from "../generic/IGenericProps";

export interface ILocaleSwitcherClassNames {
    root: string;
    item: string;
    itemActive: string;
}

export interface ILocaleSwitcherProps extends IGenericProps, IClassNamesProps<ILocaleSwitcherClassNames> {}
