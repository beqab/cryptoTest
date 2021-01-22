import * as React from "react";

export interface IMainProps {}

export const Main: React.FC<IMainProps> = ({children}) => {
    return (
        <div className="content">
            <div className="content_box">{children}</div>
        </div>
    );
};
