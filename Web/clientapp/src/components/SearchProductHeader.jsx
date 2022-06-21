import React, { useState, useEffect } from "react";
import '../assets/css/searchProduct.css';
import loading_img from '../assets/img/loading.gif';
import { searchProducts } from '../utils/request';
import { breakUpPrice } from '../utils/help';
import { Link } from 'react-router-dom';

const SearchProductHeader = props => {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [inputIsChanged, setInputIsChanged] = useState(false);
    const [searchTimer, setSearchTimer] = useState(null);
    const [orShowOutSearch, setOrShowOutSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (inputIsChanged === true) {
            setIsLoading(true);
            setProducts([]);
            if (searchTimer !== null) {
                clearTimeout(searchTimer);
            }
            if (searchInput.replace(/ /g, "").length > 0) {
                let timer = setTimeout(() => {
                    searchRequest();
                    setIsLoading(false);
                }, 1000);
                setSearchTimer(timer);
            }
            setInputIsChanged(false);
        }
    });

    const searchRequest = () => {
        setProducts([]);
        setIsLoading(true);
        searchProducts(searchInput)
            .then((responce) => {
                let data_to_view = responce.data.result;
                console.log(data_to_view);
                setProducts(data_to_view);
                setIsLoading(false);
            });
    }

    const renderProducts = (products) => {
        let list_result = products.map((item, key) => {
            return (
                <li className="search-product" key={key}>
                    <Link to={"/product?" + item.id} className="product-link">
                        <img src={item.imagePath} className="search-product-img" alt={item.name} />
                        <div className="search-results__text">
                            <div className="search-results__title">
                                {item.name}
                            </div>
                            <div className="search-results__price">
                                <b>{breakUpPrice(item.price)} грн</b>
                            </div>
                        </div>
                    </Link>
                </li>
            );
        });
        let last_item = (
            <li className="search-product" key={-1}>
                <Link className="product-link" to={"/products?search=" + searchInput}>Всі результати пошуку</Link>
            </li>
        );
        list_result.push(last_item);
        return list_result;
    }

    const searchOnChange = (event) => {
        let searchText = event.target.value;
        setSearchInput(searchText);
        setInputIsChanged(true);
    }

    const renderList = (products) => {
        if (orShowOutSearch === true && searchInput.length > 0) { //
            let items_result = <></>;
            if (products.length > 0 && isLoading === false) {
                items_result = (
                    <>
                        {renderProducts(products)}
                    </>
                );
            }
            else {
                if (isLoading === true) {
                    items_result = (
                        <li className="search-product" key={-1}>
                            <div className="product-link">
                                <img src={loading_img} className="loading-img" alt="Загрузка..."></img>
                            </div>
                        </li>
                    );
                }
                else {
                    items_result = (
                        <li className="search-product" key={-1}>
                            <div className="product-link">Нічого не знайдено =(</div>
                        </li>
                    );
                }
            }
            return (
                <ul className="product-block">
                    {items_result}
                </ul>
            );
        }

    }

    const inputSearchFocus = () => {
        if (orShowOutSearch === false) {
            setOrShowOutSearch(true);
        }
    }

    const inputSearchBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            closeOutSearch();
        }
    }

    const closeOutSearch = () => {
        setOrShowOutSearch(false);
    }

    return (
        <div className="search-block-wrapper">
            <div className="input-block"
                onFocus={inputSearchFocus}
                onBlur={inputSearchBlur}>
                <div className="search-block">
                    <input
                        className="search-input custom-input"
                        placeholder="Пошук товарів"
                        value={searchInput}
                        onChange={searchOnChange}
                    />
                    <button className="search-button">
                        <div className="icon-search pe-7s-search" />
                    </button>
                </div>
                <div className="out-search" onClick={closeOutSearch}>

                    {renderList(products)}
                </div>
            </div>
        </div>
    );
}
export default SearchProductHeader;