import React, {createContext, useState} from "react";
import {IModal} from "./IConsumerModal";
import {IdModal} from "./IdModal";
import {consumerModalInitialState} from "./consumerModalInitialState";

export const ContextModal = createContext(consumerModalInitialState);
ContextModal.displayName = "modal";

export const ConsumerModal = ContextModal.Consumer;

export const ProviderModal = ({children}: any) => {
    const [modal, setModal] = useState<IModal>({
        id: -1,
        isOpen: false,
    });

    const open = (id: IdModal) => {
        document.body.style.overflow = "hidden";
        setModal({
            id,
            isOpen: true,
        });
    };

    const close = () => {
        document.body.style.overflow = "";
        setModal({
            id: -1,
            isOpen: false,
        });
    };

    const value = {
        modal,
        open,
        close,
    };

    return <ContextModal.Provider value={value}>{children}</ContextModal.Provider>;
};
