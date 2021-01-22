import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../auth/ConsumerAuth";
import {ChangePassword} from "../modals/change-password/ChangePassword";
import {IdVerified} from "../api/IdVerified";
import {Manager2Fa} from "../components/manager-2fa/Manager2Fa";
import {withConsumer} from "../hoc/withConsumer";

export interface IPageProfileProps extends IConsumerAuth {}

const mapVerifyStatus = new Map<IdVerified, {className: string; text: string}>([
    [IdVerified.Unverified, {className: "verification_box--danger", text: "Unverified"}],
    [IdVerified.Pending, {className: "verification_box--warning", text: "Under Review"}],
    [IdVerified.Verified, {className: "verification_box--success", text: "Verified"}],
    [IdVerified.Rejected, {className: "verification_box--danger", text: "Rejected"}],
]);

const PageProfileInner: React.FC<IPageProfileProps> = ({
    user: {
        data: {firstname, lastname, onfido_status, verified, using2FA, identifier_id},
        googleCaptcha,
    },
    setUsing2FA,
}) => {
    const verifyStatus = mapVerifyStatus.get(
        onfido_status === "APPLICANT_PENDING" || onfido_status === "APPLICANT_CREATED"
            ? 2
            : onfido_status === "APPLICANT_CONFIRMED"
            ? 3
            : 1,
    )!;

    return (
        <div className="PageProfile">
            <div className="page_title1">Profile</div>
            <div className="profile_box">
                <div className="name_box">
                    <div className="profile_title mb-10">{`${firstname} ${lastname}`}</div>
                    <div className="profile_title ">{`ID: ${identifier_id}`}</div>
                    <div className="verification_status">
                        <div className={`verification_box ${verifyStatus.className}`}>{verifyStatus.text}</div>
                    </div>
                </div>
                <div className="password_box1">
                    <ChangePassword />
                    <div className="reg_info_1 reg_info_1_container">
                        <div>
                            <div className="reg_info1_1">
                                A minimum of 1 lower case letter [a-z] and{" "}
                                {/* <span style={{display: "inline-block", width: "11px"}} /> */}
                            </div>
                            <div className="reg_info1_1">
                                A minimum of 1 upper case letter [A-Z] and{" "}
                                {/* <span style={{display: "inline-block", width: "41px"}} /> */}
                            </div>
                        </div>
                        <div>
                            <div className="reg_info1_1">A minimum of 1 numeric character [0-9] and</div>
                            <div className="reg_info1_1">Passwords must be at least 8 characters in length.</div>
                        </div>
                        <div className="clear" />
                    </div>
                    <div className="clear" />
                    <Manager2Fa using2FA={using2FA} googleCaptcha={googleCaptcha} setUsing2FA={setUsing2FA} />
                </div>
            </div>
        </div>
    );
};

export const PageProfile = withConsumer(ConsumerAuth)(PageProfileInner);
