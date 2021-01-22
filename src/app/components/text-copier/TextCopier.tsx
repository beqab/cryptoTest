import "./TextCopier.scss";
import React, {useRef} from "react";
import {ITextCopierProps} from "./ITextCopierProps";
import imgCopy from "../../../assets/images/copy.png";

export const TextCopier: React.FC<ITextCopierProps> = ({value}) => {
    const ref = useRef<HTMLInputElement>(null);

    const onCLick = () => {
        if (ref.current) {
            ref.current.select();
            document.execCommand("copy");
        }
    };

    return (
        <div className="TextCopier">
            <span className="currentbtc">Your Current Bitcoin Adress</span>
            <span className="currentwallet">{value}</span>

            <input type="text" className="testinput" />

            <span className="copybtc" role="button" onClick={onCLick}>
                <img src={imgCopy} alt="copy" className="copyicon" />
                Copy Adress
            </span>
        </div>
    );
};
