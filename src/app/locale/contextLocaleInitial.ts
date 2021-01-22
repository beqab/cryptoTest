import {IContextLocale} from "./IContextLocale";
import {IdLanguage} from "./IdLanguage";

export const contextLocaleInitial: IContextLocale = {
    current: IdLanguage.Unset,
    dictionary: {},
    set: (nexLang) => undefined,
    translate: (localeId) => localeId,
    updateDictionary: (nexLang) => undefined,
};
