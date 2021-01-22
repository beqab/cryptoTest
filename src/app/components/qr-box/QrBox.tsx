import "./QrBox.scss";
import {IQrBoxProps} from "./IQrBoxProps";
import React from "react";
export const QrBox: React.FC<IQrBoxProps> = ({value}) => {
    const url = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${value}`;

    return (
        <div className="QrBox">
            <img className="QrBox__image" alt="qr code" src={url} />

            <div className="QrBox__text" />
        </div>
    );
};
