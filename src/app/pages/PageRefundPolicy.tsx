import React, {Suspense} from "react";

const RefundPolicy = React.lazy(() => import("../terms/RefundPolicy"));

export const PageRefundPolicy: React.FC = () => {
    return (
        <div className="PageRefundPolicy">
            <div className="page_title1">Refund Policy</div>
            <div className="profile_box profile_box-custom">
                <Suspense fallback={<div />}>
                    <RefundPolicy />
                </Suspense>
            </div>
        </div>
    );
};
