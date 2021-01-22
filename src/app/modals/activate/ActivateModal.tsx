import * as React from "react";
import { ConsumerAuth, IConsumerAuth } from "../../auth/ConsumerAuth";
import { useEffect, useState } from "react";
import { ConsumerModal } from "../../modal/ConsumerModal";
import { IConsumerModal } from "../../modal/IConsumerModal";
import { IdModal } from "../../modal/IdModal";
import { api } from "../../api/api";
import { compose } from "recompose";
import { utilBrowser } from "../../utils/utilBrowser";
import { withConsumer } from "../../hoc/withConsumer";

export interface IActivateModalProps extends IConsumerModal, IConsumerAuth {}

const ActivateModalInner: React.FC<IActivateModalProps> = ({ close, open }) => {
  const [activateStatus, setActivateStatus] = useState(0);
  const { token } = utilBrowser.searchToObject(window.location.search);

  useEffect(() => {
    api.activateAccount(token).subscribe((data) => {
      if (data.action === "success" && data.verified) {
        setActivateStatus(1);
        return;
      }
      setActivateStatus(-1);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="jquery-modal blocker current" onClick={() => close()}>
      <div
        id="ex2"
        className="modal modal2 d-inline-block"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm_popup activate_popup">
          {activateStatus === 0 && <div className="activate_text">...</div>}
          {activateStatus === 1 && (
            <div className="activate_text">
              <b>Your account has been successfully activated!</b>
              <br />
              <span> Thank you for registration </span>
              <br />
              Your email has been confirmed and your account is active now
              <br /> Please
              <a onClick={() => open(IdModal.LoginPrompt)}> login</a> to start
            </div>
          )}
          {activateStatus === -1 && (
            <div className="activate_text">
              <b>Something went wrong.</b>
              <br />
              Please try again later.
            </div>
          )}
        </div>
        <span className="close-modal" onClick={() => close()}>
          Close
        </span>
      </div>
    </div>
  );
};

const enhance = compose<any, any>(
  withConsumer(ConsumerModal),
  withConsumer(ConsumerAuth)
);

export const ActivateModal = enhance(ActivateModalInner);
