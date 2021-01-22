import {ILocaleSwitcherClassNames, ILocaleSwitcherProps} from "./ILocaleSwitcherProps";
import React, {useContext} from "react";
import {ContextLocale} from "./ContextLocale";
import {IdLanguage} from "./IdLanguage";
import {List} from "../generic/list/List";
import {Locale} from "./Locale";
import {utilLocale} from "./utilLocale";

const createRenderItem = (
    current: IdLanguage,
    set: (nexLang: IdLanguage) => void,
    classNames: Partial<ILocaleSwitcherClassNames>,
) => (item: IdLanguage) => {
    const classNameItem = `LocaleSwitcher__item ${
        item === current ? `LocaleSwitcher__item--active ${classNames.itemActive ? classNames.itemActive : ""}` : ""
    } ${classNames.item ? classNames.item : ""}`;

    return (
        <span key={item} className={classNameItem} onClick={() => set(item)}>
            <Locale id={item} />
        </span>
    );
};

export const LocaleSwitcher: React.FC<ILocaleSwitcherProps> = ({className = "", classNames = {}}) => {
    const {current, set} = useContext(ContextLocale);

    const classNameRoot = `LocaleSwitcher${className ? ` ${className}` : ""}${
        classNames.root ? ` ${classNames.root}` : ""
    }`;

    const renderItem = createRenderItem(current, set, classNames);

    return (
        <div className={classNameRoot}>
            <List items={utilLocale.availableLanguages} renderItem={renderItem} />
        </div>
    );
};
