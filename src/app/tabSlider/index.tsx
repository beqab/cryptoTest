import * as React from "react";

export interface ITabSlider {}

const sliderElements = [
    {
        bullet: "register",
        title: "register",
        content: () => (
            <>
                <p>
                    Please visit CryptoIEX official website and click the Sign Up button on the top right-hand side. On
                    the registration page, please follow the on-screen instructions and insert the email address and
                    password that you’ll use for your account
                </p>
                <p>Confirm your email address to sing up to CryptoIEX</p>
            </>
        ),
    },
    {
        bullet: "ID VERIFICATION",
        title: "ID VERIFICATION",
        content: () => (
            <>
                <p>
                    Visit the CryptoIEX website and LogIn to account, go to the Verification page and easily get
                    verified through our verification partners to gain access to all the CryptoIEX services
                </p>
            </>
        ),
    },
    {
        bullet: "CARD VERIFICATION",
        title: "CARD VERIFICATION",
        content: () => (
            <>
                <p>Deposit or withdraw your funds in minutes using your debit or credit card</p>
                <p>
                    In order to make card transaction you need to link your debit or credit card to your CryptoIEX
                    account via Verification Page. It takes a few minutes
                </p>
            </>
        ),
    },
    {
        bullet: "ACCESS TO WALLET",
        title: "ACCESS TO WALLET",
        content: () => (
            <>
                <p>
                    A crypto wallet is a secure place where you store your crypto funds. Wallets are created using
                    private and public keys. With access to a crypto wallet, you can check your crypto balance and
                    transaction history and move funds around the world using the blockchain
                </p>
            </>
        ),
    },
    {
        bullet: "GET STARTED",
        title: "GET STARTED",
        content: () => (
            <>
                <p>Complete our basic steps and start buying or selling cryptocurrencies</p>
                <p>We made it fast and easy!</p>
            </>
        ),
    },
];

const TabSlider: React.FC<ITabSlider> = (props) => {
    const [sliderIndex, setSliderIndex] = React.useState(0);

    const arrowHandler = (type: string): void => {
        if (type === "left") {
            setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : sliderElements.length - 1);
        } else if (type === "right") {
            setSliderIndex(sliderIndex < sliderElements.length - 1 ? sliderIndex + 1 : 0);
        }
    };
    return (
        <div className="TabSlider">
            <div className="TabSlider-control">
                <ul>
                    {sliderElements.map(({bullet}, index) => {
                        return (
                            <li className={index === sliderIndex ? "active" : ""} onClick={() => setSliderIndex(index)}>
                                <div className="TabSlider-control-bullet">
                                    <span />
                                </div>
                                <div className="TabSlider-control-title">{bullet}</div>
                            </li>
                        );
                    })}
                </ul>
                <span
                    onClick={() => arrowHandler("left")}
                    className="TabSlider-control-arrow TabSlider-control-arrow-left "
                >
                    {"<"}
                </span>
                <span
                    onClick={() => arrowHandler("right")}
                    className="TabSlider-control-arrow TabSlider-control-arrow-right "
                >
                    {">"}
                </span>
            </div>

            <div className="TabSlider-content">
                <div className="TabSlider-content-container">
                    <h3>{sliderElements[sliderIndex].title}</h3>
                    {sliderElements[sliderIndex].content()}
                </div>
            </div>
        </div>
    );
};

export default TabSlider;
