import {IDictionary} from "./IDictionary";
import {IReplace} from "./IReplace";
import {IdLanguage} from "./IdLanguage";
import {IdLocale} from "./IdLocale";

class UtilLocale {
    public readonly defaultLanguage = IdLanguage.English;

    public readonly availableLanguages = [IdLanguage.Georgian, IdLanguage.English];

    public isAvailable = (lang: IdLanguage) => this.availableLanguages.indexOf(lang) >= 0;

    public get = (dictionary: IDictionary, localeId: IdLocale, replace?: IReplace) => {
        const translation = dictionary[localeId] || localeId;

        if (replace) {
            return this.replaceKeys(translation, replace);
        }

        return translation;
    };

    private replaceKeys = (immatureTranslation: string, replace: IReplace) =>
        Object.keys(replace).reduce((acc, curr) => acc.replace(`{${curr}}`, replace[curr]), immatureTranslation);
}

export const utilLocale = new UtilLocale();
