import React from "react";
import FeesTable from "../components/PageBalance/fees";

const Fees = () => {
    return (
        <div className="PageFaq" style={{width: "100%"}}>
            <div className="page_title1">Fees</div>
            <div className="home_block5 hide_mob background-transparent" />
            <div className="profile_box faq_box1">{FeesTable()}</div>
        </div>
    );
};

export default Fees;
