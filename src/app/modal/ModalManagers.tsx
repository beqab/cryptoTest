import * as React from "react";
import {ConsumerModal} from "./ConsumerModal";
import {ModalManager} from "./ModalManager";
import {PortalModal} from "./PortalModal";

export const ModalManagers: React.FC = () => {
    return (
        <>
            <ModalManager Consumer={ConsumerModal} Portal={PortalModal} />
        </>
    );
};
