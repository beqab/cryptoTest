import {useEffect, useRef} from "react";
import ReactDOM from "react-dom";

export const PortalModal = ({children}: any) => {
    const portalRoot = document.getElementById("modal");

    const element = useRef(document.createElement("div"));

    useEffect(() => {
        const current = element.current;

        if (portalRoot) {
            portalRoot.appendChild(current);
        }

        return () => {
            if (portalRoot) {
                portalRoot.removeChild(current);
            }
        };
    }, [portalRoot]);

    return ReactDOM.createPortal(children, element.current);
};
