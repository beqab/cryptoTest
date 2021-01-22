import * as React from "react";
import androidIcon from "../../../assets/images/android.png";
import fbImg from "../../../assets/images/Facebook.png";
// import instaImg from "../../../assets/images/Instagram.png";
import iosIcon from "../../../assets/images/iphone.png";
import linkedImg from "../../../assets/images/Linkedin.png";
import {NavLink} from "react-router-dom";
import mailIcon from "../../../assets/images/mail.png";
import Logo from "../../../assets/images/asset1.svg";
// import Twitter from "../../../assets/images/TwitterIcon.png";
import VisaCard from "../../../assets/images/VisaC.png";
import MasterCard from "../../../assets/images/MasterC.svg";
import Twitter from "../../../assets/images/Twitter-Icon.svg";
import Facebook from "../../../assets/images/Facebook-Icon.svg";
import Instagram from "../../../assets/images/iconfinder.png";
import AppStore from "../../../assets/images/appStore.png";
import GooglePlay from "../../../assets/images/googlePlay.png";

export interface IFooterProps {}

const d = new Date();

let bullets = [1, 2, 3, 4, 5];

export const Footer: React.FC<IFooterProps> = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-9 ">
                        <div className="row">
                            <div className="col-4">
                                <ul className="footer-nav">
                                    <li>ABOUT</li>

                                    <li>
                                        <a href="about">About Us</a>
                                    </li>
                                    <li>
                                        <a href="iex-ou">Legal & Security</a>
                                    </li>
                                    <li>
                                        <a href="terms">Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href="refund">Refund Policy</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-4">
                                <ul className="footer-nav">
                                    <li>FEES</li>

                                    <li>
                                        <a href="fees">Fees</a>
                                    </li>

                                    <li>
                                        <a href="limits">Limits and Commissions</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-4">
                                <ul className="footer-nav">
                                    <li>CONTACT</li>

                                    <li>
                                        <a href="faq">F.A.Q.</a>
                                    </li>
                                    <li>
                                        <a href="contact">Contact us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-6 col-sm-12"> */}
                    {/* <ul className="footer-socialList  d-flex">
                                <li>
                                    <a href="#">
                                        <img src={Twitter} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src={Twitter} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src={Twitter} />
                                    </a>
                                </li>
                            </ul>
                            */}
                    {/* </div> */}
                    <div className="col-3 col-sm-12">
                        <ul className="footer-nav">
                            <li>FOLLOW</li>
                        </ul>
                        <div className="footer-socialList">
                            <a target="_blank" href="https://twitter.com/cryptoiex">
                                <img src={Twitter} />
                            </a>

                            <a href="#">
                                <img className="Instagram" src={Instagram} />
                            </a>
                        </div>
                        <div className="footer-apps row col-12 ">
                            <div className="col-6  ">
                                <a href="">
                                    <img style={{maxWidth: "77px"}} className="VisaCard" src={VisaCard} />
                                </a>
                                <a href="">
                                    <img className="MasterCard" src={MasterCard} />
                                </a>
                            </div>
                            <div className="col-6  ">
                                <a href="">
                                    <img className="mb-10" src={AppStore} />
                                </a>
                                <a href="">
                                    <img src={GooglePlay} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright col-12">
                <div className="container">
                    <span className="footer-copyright__text">Copyright {d.getFullYear()} | All rights reserved.</span>
                </div>
            </div>

            {/* <div className="footer-content">
                <div className="footer-content__item">
                    <span className="footer-content__item-title">About Cryptoiex</span>
                    <div className="footer-content__item-box">
                        <span>
                            Founded in 2019 by the group of entrepreneurs and enthusiasts from different crypto
                            businesses, Cryptoiex is the premier Estonia-based blockchain platform, providing
                            lightning-fast trade execution, dependable digital wallets and industry-leading security
                            practices. Our mission is to contribute the crypto community through simplifying exchange
                            process. Our passion is in incubating new and emerging technology, and driving
                            transformative change
                        </span>
                    </div>
                </div>
                <div className="footer-content__item">
                    <div className="footer-content__item-box">
                        <div style={{display: "flex"}}>
                            <img src={mailIcon} alt="support" />
                            <span className="footer-content__item-support">support@cryptoiex.io</span>
                        </div>
                        <ul style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
                            <li>
                                <NavLink to="/terms" style={{color: "white"}}>
                                    TOS
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" style={{color: "white"}}>
                                    Privacy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/refund" style={{color: "white"}}>
                                    Refunds
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/iex-ou" style={{color: "white"}}>
                                    AML/KYC
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-content__item">
                    <div className="footer-content__item-box">
                        <span style={{fontSize: 16, color: "white", paddingBottom: 20}}>Download our app</span>
                        <img src={androidIcon} width="245" height="72" alt="google play store" />
                        <img src={iosIcon} width="245" height="72" alt="app store" style={{marginTop: 5}} />
                    </div>
                </div>
            </div> */}
        </div>
    );
};
