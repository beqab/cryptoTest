import React, {Suspense} from "react";

const TermsAndCondition = React.lazy(() => import("../terms/TermsAndConditions"));

export interface IPageTermsProps {}

export const PageTerms: React.FC<IPageTermsProps> = () => {
    return (
        <div className="PageTerms">
            <div className="page_title1">Terms Of Service</div>
            <div className="profile_box profile_box-custom">
                <Suspense fallback={<div />}>
                    <TermsAndCondition />
                </Suspense>
            </div>
        </div>
    );
};
