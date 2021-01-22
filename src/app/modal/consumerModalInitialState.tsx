import {IConsumerModal} from "./IConsumerModal";
import {IdModal} from "./IdModal";

export const consumerModalInitialState: IConsumerModal = {
    modal: {
        isOpen: false,
        id: -1,
    },
    open: (id: IdModal) => undefined,
    close: () => undefined,
};
