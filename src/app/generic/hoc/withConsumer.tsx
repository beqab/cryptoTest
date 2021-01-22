import * as React from "react";

export const withConsumer = <TContext extends {}>(Consumer: React.Consumer<TContext>) => <TProps extends TContext>(
    Component: React.ComponentType<TProps>,
): React.FunctionComponent<Pick<TProps, Exclude<keyof TProps, keyof TContext>>> => {
    const wrapped: React.FunctionComponent<Pick<TProps, Exclude<keyof TProps, keyof TContext>>> = (originalProps) => (
        <Consumer>{(props) => <Component {...(originalProps as any)} {...props} />}</Consumer>
    );
    wrapped.displayName = `withContext(${Consumer.name || "Unknown"})`;

    return wrapped;
};
