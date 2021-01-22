import {IdModal} from "./IdModal";

export interface IModal {
    isOpen: boolean;
    id: IdModal;
}

export interface IConsumerModal {
    modal: IModal;
    open: (id: IdModal) => void;
    close: () => void;
}
