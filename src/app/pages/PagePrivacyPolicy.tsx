import React, {Suspense} from "react";

const PrivacyPolicy = React.lazy(() => import("../terms/PrivacyPolicy"));

export const PagePrivacyPolicy: React.FC = () => {
    return (
        <div className="PagePrivacyPolicy">
            <div className="page_title1">Privacy Policy</div>
            <div className="profile_box profile_box-custom">
                <Suspense fallback={<div />}>
                    <PrivacyPolicy />
                </Suspense>
            </div>
        </div>
    );
};
