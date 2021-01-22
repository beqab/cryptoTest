import React from "react";
import LimitsTable from "../components/PageBalance/limits";

const Limits = () => {
    return (
        <div className="PageFaq" style={{width: "100%"}}>
            <div className="page_title1">Limits and Commissions</div>
            <div className="home_block5 hide_mob background-transparent" />
            <div className="profile_box faq_box1">{<LimitsTable />}</div>
        </div>
    );
};

export default Limits;
