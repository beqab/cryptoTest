import React from "react";

export const HorizontalLine: React.FC = () => {
    return (
        <div style={{display: "flex", alignItems: "center", margin: 0, padding: 0}}>
            <div style={{backgroundColor: "#ffffff", height: 2, width: "50%"}}></div>
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    width: 10,
                    height: 10,
                    marginLeft: 20,
                    marginRight: 20,
                }}
            ></div>
            <div style={{backgroundColor: "#ffffff", height: 2, width: "50%"}}></div>
        </div>
    );
};
