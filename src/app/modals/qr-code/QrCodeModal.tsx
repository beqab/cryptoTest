import {ConsumerAuth, IConsumerAuth} from "../../auth/ConsumerAuth";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {QrBox} from "../../components/qr-box/QrBox";
import React from "react";
import {TextCopier} from "../../components/text-copier/TextCopier";
import {compose} from "recompose";
import {withConsumer} from "../../hoc/withConsumer";

export interface IQrCodeModalProps extends IConsumerModal, IConsumerAuth {}

const QrCodeModalInner: React.FC<IQrCodeModalProps> = ({
    close,
    user: {
        data: {wallet},
    },
}) => {
    return (
        <div className="blocker" onClick={() => close()}>
            <div id="ex3" className="modal modal2 modal5 modal6" onClick={(event) => event.stopPropagation()}>
                <div>
                    <TextCopier value={wallet} />

                    <QrBox value={wallet} />
                    <div className="QrBox__warning">
                        {" "}
                        Depositing tokens other than BTC to this address may result in your funds being lost.
                    </div>
                </div>
                <span className="close-modal modal10" onClick={() => close()} />
            </div>
        </div>
    );
};

const enhance = compose<IQrCodeModalProps, {}>(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export const QrCodeModal = enhance(QrCodeModalInner);
