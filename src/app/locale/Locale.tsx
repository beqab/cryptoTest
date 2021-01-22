import React, {useContext} from "react";
import {ContextLocale} from "./ContextLocale";
import {ILocaleProps} from "./ILocaleProps";

export const Locale: React.FC<ILocaleProps> = ({id, replace}) => {
    const {translate} = useContext(ContextLocale);

    return <span dangerouslySetInnerHTML={{__html: translate(id, replace)}} />;
};
