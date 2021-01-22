import React, {Suspense} from "react";

const IexOu = React.lazy(() => import("../terms/IexOu"));

export const PageIexOu: React.FC = () => {
    return (
        <div className="PageIexOu">
            <div className="page_title1">INTERNAL PROCEDURE AND CONTROL RULES</div>
            <div className="profile_box profile_box-custom">
                <Suspense fallback={<div />}>
                    <IexOu />
                </Suspense>
            </div>
        </div>
    );
};
