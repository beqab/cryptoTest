import * as React from "react";

export interface IPageAboutProps {}

export const PageAbout: React.FC<IPageAboutProps> = () => {
    return (
        <div className="PageAbout" style={{display: "flex", flexDirection: "column"}}>
            <div>
                <div className="info_title">About Cryptoiex</div>
                <div className="info_text" style={{color: "#ffffff"}}>
                    Founded in 2019 by the group of entrepreneurs and enthusiasts from different crypto businesses,
                    Cryptoiex is the premier Estonia-based blockchain platform, providing lightning-fast trade
                    execution, dependable digital wallets and industry-leading security practices. Our mission is to
                    contribute the crypto community through simplifying exchange process. Our passion is in incubating
                    new and emerging technology, and driving transformative change
                    <p>&nbsp;</p>
                    <div className="info_title">What makes Cryptoiex different?</div>
                    Secure platform – Cryptoiex employs the most reliable, effective security technologies available. We
                    keep to offer customer friendly solutions and most profitable rates. Also, Cryptoiex enables
                    two-factor authentication for all users and provides a host of additional security features to
                    provide multiple layers of protection. At Cryptoiex, security will always be a top priority in every
                    decision we make.
                </div>
            </div>
        </div>
    );
};
