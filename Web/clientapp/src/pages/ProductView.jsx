

import React, { useEffect, useState } from "react";
import { getProduct } from "../utils/request";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../assets/css/product-view.css';
import { breakUpPrice } from "../utils/help";
import { useNavigate} from "react-router";
const ProductView = props => {

    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);

    const history = useNavigate();

    useEffect(() => { //first load
        let splited = window.location.pathname.split('/');
        let url_product_id = splited[2];
        setProductId(url_product_id);
    }, [])

    useEffect(() => {
        let splited = window.location.pathname.split('/');
        let url_product_id = splited[2];
        setProductId(url_product_id);

        if(productId !== null)
        {
            setProductId(url_product_id);
            productRequest(url_product_id);
        }
    }, [history])

    useEffect(() => {
        if (productId !== null && product === null) {
            productRequest();
        }
    })

    const productRequest = (product_id = null) => {
        let request_product = product_id === null ? productId : product_id;
        getProduct(request_product).then(result => {
            console.log(result.data.result[0]);
            setProduct(result.data.result[0]);
        })
    }

    const renderParams = () => {
        if (product !== null) {
            let list = product.productProperties.map((item, key) => {
                return (
                    <li key={key}>
                        <div className="fname">{item.name + ": "} </div>
                        <div className="fvalue">{item.value}</div>
                    </li>
                );
            });
            let result = (
                <div>
                    <ul className="prop-list">
                        {list}
                        <li>
                            <div className="fname">Опис: </div>
                            <div className="fvalue">{product.description}</div>
                        </li>
                    </ul>
                    <h3>{breakUpPrice(product.price) + " ₴"}</h3>
                </div>
            );
            return result;
        }
    }

    const renderImages = () => {
        if (product !== null)
            return product.imagePathes.map((item, key) => {
                return (
                    <div className="img-block" key={key}>
                        <img src={item} />
                    </div>
                );
            });
    }

    return (
        <div className="wrapper">
            <div className="product-view">
                <h1>{product === null ? "" : product.name}</h1>
                <div className="product-block">
                    <div className="image-board">
                        <Carousel
                            showStatus={false}
                            showThumbs={true}
                            showIndicators={false}
                            showArrows={false}
                        >
                            {/* <div className="img-block">
                                <img src="/AppData/images/5.jpg" />
                            </div>
                            <div className="img-block">
                                <img src="/AppData/images/2.jpg" />
                            </div>
                            <div className="img-block">
                                <img src="/AppData/images/7.jpg" />
                            </div> */}
                            {renderImages()}
                        </Carousel>
                    </div>
                    <div className="product-data">
                        <h2>Характеристики:</h2>
                        {renderParams()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductView;
