import * as React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps, matchPath, withRouter} from "react-router";
import {IdPath} from "./IdPath";

export interface IPrivateRouteProps extends Pick<RouteProps, "exact" | "component">, RouteComponentProps {
    fallbackPath: IdPath;
    canActive?: () => boolean;
    path: IdPath;
}

const PrivateRouteInner: React.FC<IPrivateRouteProps> = ({fallbackPath, canActive, path, ...restProps}) => {
    const {pathname} = restProps.location;

    if (matchPath(pathname, {path}) && canActive && !canActive()) {
        return <Redirect to={fallbackPath} />;
    }

    return <Route path={path} {...restProps} />;
};

export const PrivateRoute = withRouter(PrivateRouteInner);
