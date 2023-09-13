import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import logo from '../../assets/img/logo.png';
import { openAuthModal } from '../../utils/StoreMethods/AuthControl';
import { ReactComponent as PhoneLogo } from '../../assets/img/svg/call.svg';
import SearchProductHeader from "../SearchProductHeader";
import LangSelect from '../LangSelect';
import { closeCartSidebar, setProductsId } from "../../utils/StoreMethods/CartControl";
//import { openMenuSidebar } from '../../utils/StoreMethods/MenuControl';
import '../../assets/css/cart.css';
import { getCartProducts } from "../../utils/request";
import { breakUpPrice } from "../../utils/help";

const Cart = props => {

    let current_sum = 0;
    const [cartProducts, setCartProducts] = useState(null); //[]
    const [cartProductId, setCartProductId] = useState(null); //props.currentProductsId

    //first
    useEffect(() => {
        getLocalStorageProductsId();
    }, [])

    useEffect(() => {
        if (cartProductId === null && props.currentProductsId.length !== 0) {
            setCartProductId(props.currentProductsId);
        }
        if (cartProductId !== null) {
            if (cartProductId.length > 0
                && (cartProducts === null
                    && cartProductId.length === props.countProducts)) {
                //console.log("REQUEST1");
                requestCartProducts();
            }

            if (cartProductId.length !== props.countProducts) {
                //console.log("REQUEST2");
                setCartProductId(props.currentProductsId);
            }
            else {
                if (cartProducts !== null)
                    if (cartProducts.length !== props.countProducts) {
                        //console.log("REQUEST3");
                        requestCartProducts();
                    }
            }


        }
    });

    const requestCartProducts = (productsId = null) => {
        let request_products = [];
        if (productsId === null) {
            request_products = cartProductId;
        }
        else {
            request_products = productsId;
        }
        getCartProducts(cartProductId).then(result => {
            setCartProducts(result.data.result);
        });
    }

    const getLocalStorageProductsId = () => {
        let str_items = localStorage.getItem('productsId');
        if (str_items == null) {
            str_items = "";
        }
        let res = str_items.length === 0 ? [] : str_items.split(',');
        res = res.map(item => { return parseInt(item); })
        if (res.length > 0) {
            props.setProductsId(res);
        }
    }

    const renderEmptyCart = () => {
        if (props.countProducts === 0) {
            let item = (
                <div className="empty-cart">
                    <div className="pe-7s-cart cart-icon"></div>
                    <h2 className="head-info">Ваш кошик порожній</h2>
                    <p className="additional-info">Додавайте в кошик товари, що сподобалися</p>
                    <button className="btn btn-blue" onClick={props.closeCartSidebar}>Продовжити покупки</button>
                </div>
            );
            return item;
        }
    }

    const renderProducts = () => {
        let current = cartProducts === null ? [] : cartProducts;
        current_sum = 0;
        let items = current.map((item, key) => {
            current_sum += item.price;
            let child = (
                <li key={key}>
                    <div className="pe-7s-close remove-icon" onClick={() => removeProductFromCart(item.id)}></div>
                    <div className="img-wrap">
                        <img src={item.imagePath} alt="" className="cart-image" />
                    </div>
                    <div className="info-block">
                        <div className="cart-name-block">{item.name}</div>
                        <div>{breakUpPrice(item.price)} <span>₴</span></div>
                    </div>
                </li>
            )
            return child;
        });

        return (
            <ul className="cart-products">
                {items}
            </ul>
        );
    }

    const removeProductFromCart = (productId) => {
        let current_product_cart = Object.assign([], props.currentProductsId);

        let res = [];
        current_product_cart.forEach(item => {
            if (parseInt(item) !== productId) {
                res.push(parseInt(item));
            }
        });
        // console.log(res);
        props.setProductsId(res);
    }

    const renderTotalAmount = () => {
        if (props.countProducts > 0) {
            return (
                <div className="cart__bottom">
                    <div className="cart__amount">
                        <span>До оплати:</span>
                        <span className="cart__total">
                            <div className="cart__count">Товарів: {props.countProducts}</div>
                            {breakUpPrice(current_sum)} ₴
                        </span>
                    </div>
                    <div className="btn btn-blue">Оформити замовлення</div>
                </div>
            );
        }
    }

    let cart_class = props.isOpen === true ? " active" : "";
    return (
        <div className={"cart-storage" + cart_class}>
            <div className="side-bar-close pe-7s-close" onClick={props.closeCartSidebar}></div>
            <div className="title">Кошик</div>
            {renderEmptyCart()}
            {renderProducts()}
            {renderTotalAmount()}
        </div>
    );
}

const mapStateProps = state => {
    return {
        isOpen: state.cart.cartIsOpen,
        countProducts: state.cart.countAddedProducts,
        currentProductsId: state.cart.productsId
    }
};

export default connect(mapStateProps, {
    // openAuthModal,
    // openMenuSidebar
    closeCartSidebar,
    setProductsId
})(Cart)
