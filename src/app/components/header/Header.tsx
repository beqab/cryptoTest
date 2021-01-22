import * as React from "react";
import {ConsumerAuth, IConsumerAuth} from "../../auth/ConsumerAuth";
import {Link, NavLink, useHistory} from "react-router-dom";
import {ConsumerModal} from "../../modal/ConsumerModal";
import {IConsumerModal} from "../../modal/IConsumerModal";
import {IdModal} from "../../modal/IdModal";
import {IdPath} from "../../router/IdPath";
import {compose} from "recompose";
import logo from "../../../assets/images/asset1.svg";
// import logoLoggedIn from "../../../assets/images/brand-exchange.svg";
import {useState} from "react";
import {withConsumer} from "../../hoc/withConsumer";
import DepositIcon from "../../../assets/images/deposit_icon.png";
import WithdrawIcon from "../../../assets/images/deposit_icon.png";
import BtcIcon from "../../../assets/images/bitcoin-logo2.svg";
import EuroN2 from "../../../assets/images/euroN2.svg";
// import useForm from "react-hook-form";
// import {utilFormValidation} from "../../utils/utilFormValidation";
import {useUtilBrowser} from "../../utils/UtilBrowserHook";
import HamburgerMenu from "react-hamburger-menu";


export interface IHeaderProps extends IConsumerModal, IConsumerAuth {}

const HeaderInner: React.FC<IHeaderProps> = ({
    open,
    isLoggedIn,
    user: {
        data: {firstname},
    },
    tryAuth,
    balance,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useUtilBrowser();
    const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

    const logoToShow = logo;
    const history = useHistory()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    console.log(history, "historyhistory")

    return (
        <div className={history.location.pathname === "/transferDetails" ? "d-none" : "header"}>
            <div className="header_box">
                <div className="logo">
                    <Link to="/">
                        <img src={logoToShow} alt="cryptoiex.io" />
                    </Link>
                </div>
                <div style={{display: "flex"}}>
                    <div className={`header_menu`}>
                        <ul className="header_menu-ul">
                            {!isMobile && (
                                <li className="header_menu-ul-li">
                                    <div className="dropdown">
                                        <span className="dropdown-with-arrow">Company</span>
                                        <div className="dropdown-content">
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-ul-li">
                                                    <a className="dropdown-ul-li-link" href="about">
                                                        {" "}
                                                        About Us{" "}
                                                    </a>
                                                </li>
                                                <li className="dropdown-ul-li">
                                                    <a className="dropdown-ul-li-link" href="iex-ou">
                                                        {" "}
                                                        Legal And Security{" "}
                                                    </a>
                                                </li>
                                                <li className="dropdown-ul-li">
                                                    <a className="dropdown-ul-li-link" href="contact">
                                                        {" "}
                                                        Contact{" "}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            )}
                            {!isMobile && (
                                <li className="header_menu-ul-li">
                                    <div className="dropdown">
                                        <span className="dropdown-with-arrow">Fees</span>
                                        <div className="dropdown-content">
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-ul-li">
                                                    <a className="dropdown-ul-li-link" href="limits">
                                                        Limits and Commissions
                                                    </a>
                                                </li>
                                                <li className="dropdown-ul-li">
                                                    <a className="dropdown-ul-li-link" href="fees">
                                                        Fee Schedule
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            )}
                            <li className="header_menu-ul-li">
                                <NavLink to="/faq" exact={true}>
                                    F.A.Q.
                                    <div className="line" />
                                </NavLink>
                            </li>

                            {isLoggedIn && (
                                <li className="header_menu-ul-li">
                                    <NavLink to="/support" exact={true}>
                                        Support
                                        <div className="line" />
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        {!isLoggedIn ? (
                            <button
                                className="round_button round_button-login"
                                onClick={() => open(IdModal.LoginPrompt)}
                            >
                                Log In
                            </button>
                        ) : (
                            <div className="auth_box">
                                <div className="auth_icon" onClick={toggleMenu}>
                                    {`Hello, ${firstname}`}
                                </div>
                                <div className={`auth_menu${isMenuOpen ? " auth_menu-active" : ""}`}>
                                    <ul className="auth_menu_ul" onClick={toggleMenu}>
                                        <li>
                                            <NavLink to={IdPath.Dashboard} activeStyle={{color: "#006EDA"}}>
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={IdPath.Verification} activeStyle={{color: "#006EDA"}}>
                                                Verification
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={IdPath.Profile} activeStyle={{color: "#006EDA"}}>
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={IdPath.Deposit} activeStyle={{color: "#006EDA"}}>
                                                Wallet
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={IdPath.Transactions} activeStyle={{color: "#006EDA"}}>
                                                Balance
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={IdPath.Logout} activeStyle={{color: "#006EDA"}}>
                                                LOG OUT
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <NavLink
                                        className="auth_menu_logout"
                                        to={IdPath.Logout}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        LOG OUT
                                    </NavLink>
                                    <div className="auth_menu_bg" onClick={toggleMenu} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mob_menu">
                        <div style={{position: "relative", zIndex: 9999, marginRight: 20}}>
                            <HamburgerMenu
                                isOpen={isMobMenuOpen}
                                menuClicked={() => setIsMobMenuOpen(!isMobMenuOpen)}
                                width={30}
                                height={16}
                                strokeWidth={3}
                                rotate={0}
                                color={isMobMenuOpen ? "black" : "white"}
                                borderRadius={0}
                                animationDuration={0.5}
                            />
                        </div>
                    </div>
                    {isMobMenuOpen && (
                        <div id="myNav">
                            <div className="sidenav">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 40,
                                        color: "grey",
                                    }}
                                >
                                    {isLoggedIn && (
                                        <span
                                            style={{alignSelf: "center", marginLeft: 32}}
                                        >{`Hello, ${firstname}`}</span>
                                    )}
                                </div>
                                {isLoggedIn ? (
                                    <>
                                        <ul
                                            className="auth_menu_ul"
                                            onClick={() => {
                                                setIsMobMenuOpen(false);
                                            }}
                                            style={{marginTop: 20}}
                                        >
                                            <li>
                                                <NavLink to={IdPath.Dashboard} activeStyle={{color: "#006EDA"}}>
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.Verification} activeStyle={{color: "#006EDA"}}>
                                                    Verification
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.Profile} activeStyle={{color: "#006EDA"}}>
                                                    Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.Deposit} activeStyle={{color: "#006EDA"}}>
                                                    Wallet
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.Transactions} activeStyle={{color: "#006EDA"}}>
                                                    Balance
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.Logout} activeStyle={{color: "#006EDA"}}>
                                                    LOG OUT
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <div>
                                        <ul
                                            className="auth_menu_ul"
                                            onClick={() => {
                                                setIsMobMenuOpen(false);
                                            }}
                                            style={{marginTop: 20}}
                                        >
                                            <li>
                                                <NavLink to={IdPath.Home} activeStyle={{color: "#006EDA"}}>
                                                    Home
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to={IdPath.Contact} activeStyle={{color: "#006EDA"}}>
                                                    Contact
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={IdPath.About} activeStyle={{color: "#006EDA"}}>
                                                    About Us
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to={IdPath.Faq} activeStyle={{color: "#006EDA"}}>
                                                    F.A.Q.
                                                </NavLink>
                                            </li>
                                            <li>
                                                <span
                                                    className=""
                                                    onClick={() => {
                                                        open(IdModal.LoginPrompt);
                                                        setIsMenuOpen(false);
                                                    }}
                                                    style={{padding: "8px 8px 8px 32px", fontSize: 18, fontWeight: 500}}
                                                >
                                                    Log In
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isLoggedIn && (
                <div className="balance">
                    <ul>
                        {/*  <li>$ USD: {balance["USD"].balance}</li>*/}
                        <li>
                            {/* € */}
                            <img className="EuroN2" src={EuroN2} />
                            EUR: {  balance["EUR"].balance.toFixed(2)}
                            {/* EUR: {balance["EUR"].balance % 1 === 0 ? balance["EUR"].balance :   balance["EUR"].balance.toFixed(2)} */}
                        </li>
                        <li className="d-flex"> 
                            <img src={BtcIcon} />
                            BTC: {balance["BITCOIN"].balance}
                        </li>
                    </ul>
                    <div>
                        <NavLink to="/wallet">
                            <button
                                style={{cursor: "pointer", display: "flex", width: "124px", justifyContent: "center"}}
                            >
                                <img src={DepositIcon} alt="" width="16" />
                                <span style={{marginLeft: 10}}>Deposit</span>
                            </button>
                        </NavLink>
                        <NavLink to="/withdraw">
                            <button style={{cursor: "pointer", display: "flex"}}>
                                <img
                                    style={{
                                        transform: "rotate(180deg)",
                                    }}
                                    src={WithdrawIcon}
                                    alt=""
                                    width="16"
                                />
                                <span style={{marginLeft: 10}}>Withdraw</span>
                            </button>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );

    // return (
    //     <div className="header">
    //         <div className="header_box">
    //             {isLoggedIn ? (
    //                 <div className="auth_box">
    //                     <div className="auth_icon" onClick={toggleMenu}>
    //                         <b>{`Hello, ${firstname}`}</b>
    //                     </div>
    //                     <div className={`auth_menu${isMenuOpen ? " auth_menu-active" : ""}`}>
    //                         <div className="auth_menu_container">
    //                             <ul className="auth_menu_ul" onClick={toggleMenu}>
    //                                 <li>
    //                                     <NavLink to={IdPath.Dashboard}>Dashboard</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.Verification}>Verification</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.Profile}>Profile</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.Deposit}>Wallet</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.Transactions}>Transactions</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.Logout}>LOG OUT</NavLink>
    //                                 </li>
    //                             </ul>
    //                             <NavLink
    //                                 className="auth_menu_logout"
    //                                 to={IdPath.Logout}
    //                                 onClick={() => setIsMenuOpen(false)}
    //                             >
    //                                 LOG OUT
    //                             </NavLink>
    //                         </div>
    //                         <div className="auth_menu_bg" onClick={toggleMenu} />
    //                     </div>
    //                 </div>
    //             ) : (
    //                 <div className="auth_box">
    //                     <span className="auth_link login_button" onClick={() => open(IdModal.LoginPrompt)}>
    //                         LOG IN
    //                     </span>

    //                     <div className={`auth_menu${isMenuOpen ? " auth_menu-active" : ""}`}>
    //                         <div className="auth_menu_container">
    //                             <div className="auth_menu_header">
    //                                 <span>
    //                                     <div className="logo">
    //                                         <Link to="/">
    //                                             <img src={logoToShow} alt="cryptoiex.io" />
    //                                         </Link>
    //                                     </div>
    //                                 </span>
    //                             </div>
    //                             <ul className="auth_menu_ul" onClick={toggleMenu}>
    //                                 <li>
    //                                     <NavLink to={IdPath.Home}>Home</NavLink>
    //                                 </li>

    //                                 <li>
    //                                     <NavLink to={IdPath.Contact}>Contact</NavLink>
    //                                 </li>
    //                                 <li>
    //                                     <NavLink to={IdPath.About}>About Us</NavLink>
    //                                 </li>

    //                                 <li>
    //                                     <NavLink to={IdPath.Faq}>F.A.Q</NavLink>
    //                                 </li>

    //                                 <li>
    //                                     <NavLink to={IdPath.Faq}>F.A.Q</NavLink>
    //                                 </li>
    //                             </ul>
    //                             <span
    //                                 className="auth_menu_logout"
    //                                 onClick={() => {
    //                                     open(IdModal.LoginPrompt);
    //                                     setIsMenuOpen(false);
    //                                 }}
    //                             >
    //                                 Log In
    //                             </span>
    //                         </div>
    //                         <div className="auth_menu_bg" onClick={toggleMenu} />
    //                     </div>
    //                 </div>
    //             )}

    //             <div className="logo">
    //                 <Link to="/">
    //                     <img src={logoToShow} alt="cryptoiex.io" />
    //                 </Link>
    //             </div>

    //             <div className="mob_menu">
    //                 <div
    //                     className={`hamburger hamburger--squeeze ${isMenuOpen ? "is-active" : ""}`}
    //                     style={{marginLeft: "auto"}}
    //                     onClick={toggleMenu}
    //                 >
    //                     <span className="hamburger-box">
    //                         <span className="hamburger-inner" />
    //                     </span>
    //                 </div>
    //             </div>

    //             <div className={`header_menu${isMobMenuOpen ? " header_menu-active" : ""}`}>
    //                 <ul>
    //                     <li>
    //                         <NavLink to="/about" exact={true}>
    //                             About us
    //                             <div className="line" />
    //                         </NavLink>
    //                     </li>

    //                     <li>
    //                         <NavLink to="/faq" exact={true}>
    //                             F.A.Q
    //                             <div className="line" />
    //                         </NavLink>
    //                     </li>
    //                     <li>
    //                         <NavLink to="/contact" exact={true}>
    //                             Contact
    //                             <div className="line" />
    //                         </NavLink>
    //                     </li>
    //                     {isLoggedIn && (
    //                         <li>
    //                             <NavLink to="/support" exact={true}>
    //                                 Support
    //                                 <div className="line" />
    //                             </NavLink>
    //                         </li>
    //                     )}
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // );
};

const enhance = compose<any, any>(withConsumer(ConsumerModal), withConsumer(ConsumerAuth));

export const Header = enhance(HeaderInner);
