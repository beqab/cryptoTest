import {IListProps} from "./IListProps";
import React from "react";

export const List = <T extends {}>({items, renderItem}: IListProps<T>) => <>{items.map(renderItem)}</>;
