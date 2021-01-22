import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {ConsumerExchange, IConsumerExchange, currencies} from "./ConsumerExchange";
import {FormEvent, useState} from "react";
import {ConsumerModal} from "../modal/ConsumerModal";
import {IConsumerModal} from "../modal/IConsumerModal";
import {IdCurrency} from "../api/constants/IdCurrency";
import {compose} from "recompose";
import {utilNumbers} from "../utils/utilNumbers";
import {withConsumer} from "../hoc/withConsumer";

export interface ISellAndWithdrawModalProps extends IConsumerModal, IConsumerAuth, IConsumerExchange {}

const SellAndWithdrawModalInner: React.FC<ISellAndWithdrawModalProps> = ({
    close,
    exchangeEUR,
    exchangeUSD,
    selectedCurrency,
    value,
    setValue,
    user: {
        data: {balance},
    },
}) => {
    const [formValue, setFormValue] = useState(value);

    const multipliedValue = utilNumbers.floor(
        parseFloat(formValue) * (selectedCurrency === IdCurrency.USD ? exchangeUSD.last : exchangeEUR.last),
    );
    const currency = currencies.find((item) => item.value === selectedCurrency)!.label;

    const formattedValue = `${isNaN(multipliedValue) ? 0 : multipliedValue} ${currency}`;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="jquery-modal blocker current" onClick={() => close()}>
            <div id="ex2" className="modal modal1 d-inline-block" onClick={(event) => event.stopPropagation()}>
                <div className="confirm_popup">
                    <form className="auth_form pt-15" onSubmit={onSubmit}>
                        <div className="confirm_value">CONFIRM</div>
                        <input
                            type="number"
                            className="auth_input"
                            name="value"
                            value={formValue}
                            onChange={(event) => setFormValue(event.target.value)}
                        />
                        <input type="text" value={formattedValue} className="auth_input" disabled={true} />
                    </form>

                    <div className="confirm_buttons">
                        <button type="submit" className="confirm_yes">
                            YES
                        </button>
                        <button className="confirm_no" onClick={() => close()}>
                            NO
                        </button>
                    </div>
                </div>
                <span className="close-modal" onClick={() => close()}>
                    Close
                </span>
            </div>
        </div>
    );
};

const enhance = compose<ISellAndWithdrawModalProps, ISellAndWithdrawModalProps>(
    withConsumer(ConsumerAuth),
    withConsumer(ConsumerModal),
    withConsumer(ConsumerExchange),
);

export const SellAndWithdrawModal = enhance(SellAndWithdrawModalInner);
