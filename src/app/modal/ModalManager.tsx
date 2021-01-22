import {IConsumerModal} from "./IConsumerModal";
import React from "react";
import {configModal} from "./configModal";

export interface IModalManagerProps {
    Consumer: any;
    Portal: any;
}

export const ModalManager: React.FC<IModalManagerProps> = ({Consumer, Portal}) => {
    return (
        <Consumer>
            {({modal, open, close}: IConsumerModal) => {
                const Component = configModal.get(modal.id)!;

                return <Portal>{modal.isOpen ? <Component /> : null}</Portal>;
            }}
        </Consumer>
    );
};
