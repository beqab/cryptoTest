import React from "react";

export const VerticalLine: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 0,
                padding: 0,
            }}
        >
            <div style={{backgroundColor: "#ffffff", height: 200, width: 2}}></div>
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    width: 10,
                    height: 10,
                    marginTop: 20,
                    marginBottom: 20,
                }}
            ></div>
            <div style={{backgroundColor: "#ffffff", height: 110, width: 2}}></div>
        </div>
    );
};
