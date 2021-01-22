import "./Page.scss";
import {IPageProps} from "./IPageProps";
import React from "react";

export const Page: React.FC<IPageProps> = ({className = "", children}) => {
    const classNameRoot = `Page ${className}`;

    return <div className={classNameRoot}>{children}</div>;
};
