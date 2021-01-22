import "./Container.scss";
import {IGenericProps} from "../../IGenericProps";
import React from "react";

export const Container: React.FC<IGenericProps> = ({className, children}) => (
    <div className={`Container${className ? ` ${className}` : ""}`}>{children}</div>
);
