import React, { useState } from "react";
import '../assets/css/menu.css';
import CatalogList from "./CatalogList";
import { connect } from "react-redux";
import { closeMenuSidebar } from '../utils/StoreMethods/MenuControl';
import { openCartSidebar } from "../utils/StoreMethods/CartControl";
import { ReactComponent as PhoneLogo } from '../assets/img/svg/call.svg';
const Menu = props => {


    const updateState = () =>
    {
        props.closeMenuSidebar();
        props.openCartSidebar();
    }

    let menuClass = props.menuIsOpen === true ? "menu __active" : "menu";
    return (
        <div className={menuClass}>
            <div className="side-bar-close pe-7s-close" onClick={props.closeMenuSidebar}></div>
            <div className="menu-wrapper">
                <div className="title">
                    Меню
                </div>
                <div className="head">
                    <div className="hb" onClick={updateState}>
                        <div className="icon-menu">
                            <div className="icon pe-7s-cart">
                            </div>
                            <div className="basket-items">{props.cartProductCount}</div>
                        </div>
                        <div className="text">
                            Корзина
                        </div>
                    </div>
                    <div className="hb">
                        <div className="icon-menu">
                            <div className="icon pe-7s-call">
                            </div>
                        </div>
                        <div className="text">
                            Підтримка
                        </div>
                    </div>
                </div>

                <div className="title-submenu">
                    Каталог
                </div>
                <CatalogList></CatalogList>
                <br />
                <div className="title-submenu">
                    Підтримка
                </div>
                <div className="contact">
                    <a href="tel:+380123456789" className="number">+38 (012) 345 67 89</a>
                    <a href="/" className="work-time">09.00 до 20.00</a>
                    <div className="call-logo">{<PhoneLogo/>}</div>
                </div>
                <div className="addphones">
                    <a href="tel:+380670000000" className="number">067 000 00 00</a>
                    <div className="phonessep"></div>
                    <a href="tel:+380500000000" className="number">050 000 00 00</a>
                    <div className="phonessep"></div>
                    <a href="tel:+380930000000" className="number">093 000 00 00</a>
                </div>
            </div>
        </div>
    );
}

const mapStateProps = state => {
    return {
        cartProductCount: state.cart.countAddedProducts,
        menuIsOpen: state.generalMenu.sidebarIsOpen
    }
};

export default connect(mapStateProps, {
    closeMenuSidebar,
    openCartSidebar
})(Menu)