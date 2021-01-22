import {IDictionary} from "./IDictionary";
import {IReplace} from "./IReplace";
import {IdLanguage} from "./IdLanguage";
import {IdLocale} from "./IdLocale";

export interface IContextLocale {
    current: IdLanguage;
    dictionary: IDictionary;
    set: (nexLang: IdLanguage) => void;
    translate: (localeId: IdLocale, replace?: IReplace) => string;
    updateDictionary: (data: IDictionary) => void;
}
