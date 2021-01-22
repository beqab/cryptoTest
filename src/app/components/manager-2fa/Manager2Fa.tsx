import * as React from "react";
import {IManualCodeProps, ManualCodeForm} from "./ManualCodeForm";
import {Disable2FaForm} from "./Disable2FaForm";

export interface IManager2FaProps extends IManualCodeProps {
    googleCaptcha: string;
    using2FA: boolean;
}

export const Manager2Fa: React.FC<IManager2FaProps> = ({googleCaptcha, using2FA, setUsing2FA}) => {
    return (
        <div className="profile_item">
            {/* <div className="profile_title">Google Authenticator</div> */}
            <div className="profile_l">
                {using2FA ? (
                    <Disable2FaForm setUsing2FA={setUsing2FA} />
                ) : (
                    <div className="profile_l-box">
                        {/* <div className="profile_title1 mb-10">Scan This QR Code</div> */}
                        <div className="profile_qr">
                            <img src={googleCaptcha} alt="google captcha" />
                        </div>
                        <div className="profile_title3">
                            <span>
                                Use your Google Authenticator app to scan this QR code and enter the one time password
                                below.
                            </span>
                            <div className="profile_r">{!using2FA && <ManualCodeForm setUsing2FA={setUsing2FA} />}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
