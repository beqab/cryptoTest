import React, {useEffect, useState} from "react";
import {IContextLocale} from "./IContextLocale";
import {IDictionary} from "./IDictionary";
import {IReplace} from "./IReplace";
import {IdLanguage} from "./IdLanguage";
import {IdLocale} from "./IdLocale";
import {IdStorage} from "../storage/IdStorage";
import {api} from "../api/api";
import {contextLocaleInitial} from "./contextLocaleInitial";
import {utilLocale} from "./utilLocale";
import {utilStorage} from "../storage/utilStorage";

export const ContextLocale = React.createContext<IContextLocale>(contextLocaleInitial);
ContextLocale.displayName = "ContextLocale";

export const ConsumerLocale = ContextLocale.Consumer;

export const ProviderLocale: React.FC = ({children}) => {
    const [currentLocale, setCurrentLocale] = useState<IdLanguage>(IdLanguage.Unset);
    const [dictionary, setDictionary] = useState<IDictionary>({});

    useEffect(() => {
        const storedLanguage = utilStorage.get<IdLanguage>(IdStorage.Language);

        if (storedLanguage && utilLocale.isAvailable(storedLanguage)) {
            set(storedLanguage);
            return;
        }

        set(utilLocale.defaultLanguage);
        // eslint-disable-next-line
    }, []);

    const set = (nextLang: IdLanguage) => {
        if (!utilLocale.isAvailable(nextLang) || nextLang === currentLocale) {
            // TODO: throw error if language is not available
            return;
        }

        // api.getLocales(nextLang).subscribe((data) => {
        //     if (!data) {
        //         // TODO: handle error
        //         return;
        //     }

        //     setDictionary(data);
        //     setCurrentLocale(nextLang);
        //     document.documentElement.lang = nextLang;
        //     utilStorage.set(IdStorage.Language, nextLang);
        // });
    };

    const updateDictionary = (data: IDictionary) => setDictionary({...dictionary, ...data});

    const translate = (localeId: IdLocale, replace?: IReplace) => utilLocale.get(dictionary, localeId, replace);

    const value: IContextLocale = {
        current: currentLocale,
        dictionary,
        set,
        translate,
        updateDictionary,
    };

    return <ContextLocale.Provider value={value}>{children}</ContextLocale.Provider>;
};
