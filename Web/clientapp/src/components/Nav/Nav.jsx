import React from "react";
import { Link } from 'react-router-dom';
import '../../assets/css/navbar.css';
import { connect } from "react-redux";
import logo from '../../assets/img/logo.png';
import { openAuthModal, ResetCredentials } from '../../utils/StoreMethods/AuthControl';
import { ReactComponent as PhoneLogo } from '../../assets/img/svg/call.svg';
import SearchProductHeader from "../SearchProductHeader";
import LangSelect from '../LangSelect';
import { openMenuSidebar } from '../../utils/StoreMethods/MenuControl';
import { openCartSidebar } from "../../utils/StoreMethods/CartControl";
import { removeLocalStorageCredintials } from "../../utils/help";

const Nav = props => {
    const renderUserBar = () => {
        let notAutorizedUser = (
            <div className="userbar" onClick={props.openAuthModal}>
                <div className="userbar-icon pe-7s-user"></div>
                <div className="text">Вхід</div>
            </div>);
        let autorizedUser = (
            <div className="userbar" onClick={() => {
                props.ResetCredentials();
                removeLocalStorageCredintials();
            }}>
                <div className="userbar-icon pe-7s-user"></div>
                <div className="text">{props.userName}</div>
            </div>
        );
        return props.userIsAutorized === true ? autorizedUser : notAutorizedUser;
    }

    return (
        <div className="navbar">
            <div className="header-wrapper">
                <div className="head">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="" className="logo" />
                    </Link>
                    <SearchProductHeader />
                    <div className="nav-column">
                        <div className="phone-number-section">
                            <PhoneLogo />
                            <a href="tel:+380123456789" className="phone-number">+38 (012) 345 67 89</a>
                            <span className="span-phone">Безплатна консультація</span>
                        </div>
                        <div className="basket" onClick={props.openCartSidebar}>
                            <div className="icon-block">
                                <div className="icon pe-7s-cart" />
                                <div className="basket-items">{props.cartProductCount}</div>
                            </div>
                            <div className="basket-text" >Мої замовлення</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="header-wrapper">
                    <div className="bottom-header-container">
                        <div className="bottom-header-catalog">
                            <div className="catalog-button" onClick={props.openMenuSidebar}>
                                <span className="pe-7s-menu menu-icon"></span>
                                Каталог
                            </div>
                        </div>
                        <div className="bottom-header-middle">

                        </div>
                        <div className="bottom-headder-right">
                            <div className="lang-bar">
                                <LangSelect />
                            </div>
                            {renderUserBar()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateProps = state => {
    return {
        cartProductCount: state.cart.countAddedProducts,
        userIsAutorized: state.auth.isAutorized,
        userName: state.auth.userName
    }
};

export default connect(mapStateProps, {
    openAuthModal,
    openMenuSidebar,
    openCartSidebar,
    ResetCredentials
})(Nav)
