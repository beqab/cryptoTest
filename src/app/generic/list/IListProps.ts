import * as React from "react";

export interface IListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}
