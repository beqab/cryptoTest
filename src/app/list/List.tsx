import * as React from "react";

export interface IListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export const List = <T extends {}>({items, renderItem}: IListProps<T>) => <>{items.map(renderItem)}</>;
