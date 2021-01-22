import "./Title.scss";
import {ITitleProps} from "./ITitleProps";
import {Locale} from "../../locale/Locale";
import React from "react";

export const Title: React.FC<ITitleProps> = ({className, localeId, replace}) => {
    const classNameRoot = `Title${className ? ` ${className}` : ""}`;

    return (
        <h1 className={classNameRoot}>
            <Locale id={localeId} replace={replace} />
        </h1>
    );
};
