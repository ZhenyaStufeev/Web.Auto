import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import '../assets/css/randomproducts.css';
import '../assets/css/product-list.css';
import { Link } from 'react-router-dom';
import { getRandomProducts } from "../utils/request";
import { breakUpPrice } from "../utils/help";
import { setProductsId } from "../utils/StoreMethods/CartControl";
const RandomProducts = props => {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (productList.length === 0) {
            requestProducts();
        }
    })


    const containsProductInCart = (productId) => {
        let isContains = false;
        if (props.currentProductsId != null) {
            props.currentProductsId.forEach(item => {
                if (productId === item) {
                    isContains = true;
                    return;
                }
            })
        }
        return isContains;
    }

    const renderItems = () => {
        return productList.map((item, key) => {
            let class_icon = containsProductInCart(item.id) === true ? " pe-7s-check" : " pe-7s-cart";
            return (
                <li key={key}
                    className="product-item">
                    <div className="product-body">
                        <div className="head">
                            <img src={item.imagePath} />
                        </div>
                        <div className="bottom">
                            <Link className="product-view" to={"/view/" + item.id}><div className="product-name">{item.name}</div></Link>
                            <div className="bottom__inline">
                                <div className="price">
                                    {breakUpPrice(item.price)}
                                    <span>₴</span>
                                </div>
                                <div className={"cart" + class_icon} onClick={() => addProductToCart(item.id)}></div>
                            </div>
                            {/* <Link to={"/view/" + item.id} className="btn btn-blue">Купить</Link> */}
                        </div>
                    </div>
                </li>
            );
        });
    }

    const addProductToCart = (productId) => {
        let current_product_cart = Object.assign([], props.currentProductsId);
        let isAdd = true;

        current_product_cart.forEach(item => {
            if (parseInt(item) === productId) {
                isAdd = false;
                return;
            }
        })
        if (isAdd) {
            current_product_cart.push(productId);
            props.setProductsId(current_product_cart);
        }
    }


    const requestProducts = () => {
        getRandomProducts()
            .then(result => {
                let data = result.data.result;
                setProductList(data);
            });
    }

    return (
        <div className="random-block">
            <ul className="catalogTabs-nav-box">
                <li className="catalogTabs-nav-li __active">
                    <a className="catalogTabs-nav-a">Для вас</a>
                </li>
                <li className="catalogTabs-nav-li">
                    <a className="catalogTabs-nav-a">Новинки</a>
                </li>
                <li className="catalogTabs-nav-li">
                    <a className="catalogTabs-nav-a">Популярні</a>
                </li>
            </ul>
            <div className="pr_wrap">
                <ul className="product-list">
                    {renderItems()}
                </ul>
            </div>
        </div>
    );
}

const mapStateProps = state => {
    return {
        currentProductsId: state.cart.productsId
    }
};

export default connect(mapStateProps, {
    setProductsId
})(RandomProducts)