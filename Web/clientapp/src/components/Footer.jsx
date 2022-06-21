import React from "react";
import '../assets/css/footer.css';
import logo from '../assets/img/logo2.png';
import party from '../assets/img/party-popper.webp';
const Footer = props => {
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="left">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <span>MrKoT9pA.pp.ua</span>
                    </div>
                    <div className="destr">
                        <img src={party} alt="" />
                        © 2022 - {new Date().getFullYear()}. Будь-яке копіювання неодмінно псує вашу карму.
                    </div>
                </div>
                <div className="right">
                    <div className="phones">
                        <div className="phone">
                            012 345 67 89
                        </div>
                        <div className="phone">
                            067 345 67 89
                        </div>
                        <div className="phone">
                            050 345 67 89
                        </div>
                        <div className="phone">
                            093 345 67 89
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;