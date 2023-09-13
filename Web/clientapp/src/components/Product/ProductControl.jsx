import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getProducts, getFilters, getCategory } from "../../utils/request";
import { usePrevious } from "../../utils/help";
import Filter from "./Filter";
import ReactPaginate from "react-paginate";
import ProductList from "./ProductList";
import Select from 'react-select';
import '../../assets/css/product-list.css';
import '../../assets/css/filter.css';
import '../../assets/css/product-control.css';
import '../../assets/css/paginate.css';
import '../../assets/css/selected-filters.css';
import '../../assets/css/select.css';

const ProductControl = props => {

    const options = [
        { value: 0, label: 'Новинки' },
        { value: 1, label: 'Від дорогих до дешевих' },
        { value: 2, label: 'Від дешевих до дорогих' },
    ];

    const productTop = useRef();
    const history = useNavigate();
    const [productList, setProductList] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryIsChanged, setCategoryIsChanged] = useState(null);
    const [filters, setFilters] = useState([]);
    const [numberPage, setNumberPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [filterIsOpen, setFilterIsOpen] = useState(false);

    const [minPrice, setMinPrice] = useState(-1);
    const [maxPrice, setMaxPrice] = useState(-1);

    const [requestMaxPrice, setRequestMaxPrice] = useState(-1);
    const [requestMinPrice, setRequestMinPrice] = useState(-1);

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFiltersId, setSelectedFiltersId] = useState([]);

    const [selectedOrderOption, setSelectedOrderOption] = useState(options[0]);

    const prevPage = usePrevious(numberPage);
    const prevCategoryId = usePrevious(categoryId);
    const prevFiltersId = usePrevious(selectedFiltersId);
    const prevSelectedOption = usePrevious(selectedOrderOption);

    const [priceTimer, setPriceTimer] = useState(null);

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        let splited = window.location.pathname.split('/');
        let url_category_id = splited[2];

        if (categoryId !== url_category_id) {
            setCategoryId(url_category_id);
            setCategoryIsChanged(false);
        }
        if (prevCategoryId !== categoryId && categoryId !== null) {
            clearTimeout(priceTimer);
            setSelectedFilters([]);
            setSelectedFiltersId([]);
            setMinPrice(-1);
            setMaxPrice(-1);
            setRequestMaxPrice(-1);
            setRequestMinPrice(-1);
            setNumberPage(0);
            requestProducts(true, true);
            requestFilters();
            if(categoryName.length === 0)
            {
                requestCategory();
            }
            productTop.current.scrollIntoView({ behavior: 'smooth' });
        }

        else {
            if (requestMaxPrice >= 0 && requestMinPrice >= 0) {
                if (maxPrice >= requestMaxPrice || maxPrice < 0) {
                    setMaxPrice(requestMaxPrice);
                }

                if (minPrice <= requestMinPrice || minPrice < 0) {
                    setMinPrice(requestMinPrice);
                }
            }

            if (prevFiltersId !== selectedFiltersId && prevFiltersId != null) {
                if (categoryIsChanged === true) {
                    setCategoryIsChanged(false);
                }
                else {
                    // console.log("FILTER");
                    requestProducts(false); //Йде другий запит, якщо зміна категорії
                }
                setNumberPage(0);
            }

            if (prevSelectedOption !== selectedOrderOption) {
                if (categoryIsChanged === false && prevSelectedOption != null) {
                    // console.log("Change");
                    requestProducts();
                    setNumberPage(0);
                }
            }

            if (prevPage !== numberPage) {
                requestProducts(); //другий запит, якщо пейджа не ноль
                productTop.current.scrollIntoView({ behavior: 'smooth' });
            }
        }


    });

    const requestCategory = () =>
    {
        getCategory(categoryId).then(result => {
            setCategoryName(result.data.result[0]);
        })
    }

    const requestProducts = (ignorePrice = false, ignoreFilters = false) => {
        if (categoryId !== null) {

            let _minPrice = ignorePrice === true ? -1 : minPrice;
            let _maxPrice = ignorePrice === true ? -1 : maxPrice;
            let _selectedFiltersId = ignoreFilters === true ? [] : selectedFiltersId;

            //console.log(_selectedFiltersId, _minPrice, _maxPrice, selectedOrderOption.value, (numberPage + 1), categoryId);
            getProducts(_selectedFiltersId, _minPrice, _maxPrice, selectedOrderOption.value, (numberPage + 1), categoryId)
                .then(result => {
                    let data = result.data.result[0];
                    setProductList(data.productList);
                    setTotalPages(data.totalPages);
                    setTotalProducts(data.totalProducts);
                    setRequestMaxPrice(data.priceSelector.maxPrice);
                    setRequestMinPrice(data.priceSelector.minPrice);
                    if (ignorePrice) {
                        setMaxPrice(data.priceSelector.maxPrice);
                        setMinPrice(data.priceSelector.minPrice);
                    }
                });
        }
    }
    const requestFilters = () => {
        if (categoryId !== null) {
            getFilters(categoryId).then(result => {
                let res_filter = result.data.result;
                resetFiltersDefault(res_filter);
            })
        }
    }
    const changeVisibilityFilterGroup = (fNameId) => {
        let current_filters = Object.assign([], filters);
        current_filters.forEach(item => {
            if (item.id === fNameId) {
                item.isVisible = !item.isVisible;
            }
            return;
        });
        setFilters(current_filters);
        //console.log(current_filters);
    }
    const resetFiltersDefault = (input_filter = null) => {
        setSelectedFilters([]);
        setSelectedFiltersId([]);

        let res_filter = input_filter === null ? filters : input_filter;
        // console.log(res_filter);
        let current_filters = res_filter.map(fName => {
            fName.isVisible = true;
            let fValues = fName.childrens.map(fValue => {
                fValue.isSelected = false;
                fValue.isVisible = true;
                return fValue;
            });
            fName.childrens = fValues;
            return fName;
        });
        //console.log(current_filters);
        setFilters(current_filters);
    }
    const handlePageClick = (e) => {
        setNumberPage(e.selected);
    }
    const rangeOnChange = (data) => {
        if (priceTimer !== null) {
            clearTimeout(priceTimer);
        }
        let timer = setTimeout(() => {
            requestProducts();
            setNumberPage(0);
        }, 1000);
        setPriceTimer(timer);

        if (data[0] !== minPrice) {
            setMinPrice(data[0]);
        }
        if (data[1] !== maxPrice) {
            setMaxPrice(data[1]);
        }
    }
    const updateFilters = (new_filters) => {
        setFilters(new_filters);
        let selected_filters = [];
        let selected_filters_id = [];
        new_filters.forEach(fName => {
            fName.childrens.forEach(fValue => {
                if (fValue.isSelected) {
                    selected_filters.push(fValue);
                    selected_filters_id.push(fValue.id);
                }
            })
        });
        setSelectedFiltersId(selected_filters_id);
        setSelectedFilters(selected_filters);
    }
    const renderSelectedFilters = () => {
        return selectedFilters.map((filter, key) => {
            return (
                <li key={key} onClick={() => unCheckFilter(filter.id)}>
                    <div className="text-block">
                        {filter.name}
                    </div>
                    <div className="delete-icon pe-7s-close" />
                </li>
            );
        })
    }
    const unCheckFilter = (fValueId) => {
        let prop_filters = Object.assign([], filters);
        prop_filters.forEach(fName => {
            fName.childrens.forEach(fValue => {
                if (fValue.id === fValueId) {
                    fValue.isSelected = !fValue.isSelected;
                    return;
                }
            })
            return;
        });
        updateFilters(prop_filters);
    }
    const orderOnChange = (e) => {
        if (e.value !== selectedOrderOption.value) {
            setSelectedOrderOption(e);
        }
    }
    const fNameSearchOnchange = (fNameId, searchValue) => {
        //console.log(fNameId, searchValue);
        let current_filters = filters.map(fName => {
            if (fName.id === fNameId) {
                let fValues = fName.childrens.map(fValue => {
                    if (fValue.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        fValue.isVisible = true;
                    }
                    else {
                        fValue.isVisible = false;
                    }
                    return fValue;
                });
                fName.childrens = fValues;
            }
            return fName;
        });
        setFilters(current_filters);
    }
    const filterOpen = () => {
        setFilterIsOpen(true);
    }
    const filterClose = () => {
        setFilterIsOpen(false);
    }

    let filter_block_class = filterIsOpen === true ? " active" : "";

    return (
        <div className="wrapper wrapper-catalog">
            <div className="catalog__title">
                <h1 className="product-header">{categoryName}</h1>
                <div className="catalog__count">Знайдено {totalProducts} товарів</div>
            </div>
            <div ref={productTop} className="product-control">
                <Filter
                    filters={filters}
                    priceOnChange={rangeOnChange}
                    maxPrice={requestMaxPrice}
                    minPrice={requestMinPrice}
                    currentMinPrice={minPrice}
                    currentMaxPrice={maxPrice}
                    unCheckFilter={unCheckFilter}
                    changeVisibilityFilterGroup={changeVisibilityFilterGroup}
                    fNameSearchOnchange={fNameSearchOnchange}
                    className={filter_block_class}
                    closeHandler={filterClose}
                ></Filter>
                <div className="product-block">
                    <div className="product-block__head">
                        <div className="selected-filters">
                            <ul className="filters-list">
                                {renderSelectedFilters()}
                                {
                                    selectedFiltersId.length > 1 ? (<li key={-1} className="clear-filters">
                                        <div className="text-block" onClick={() => resetFiltersDefault()}>
                                            Очистити всі фільтри
                                        </div>
                                    </li>) : <></>
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="order-select">
                        <button className="btn btn-blue filter-button" onClick={filterOpen}>Фільтр</button>
                        <div className="order-group">
                            <span>Спочатку: </span>
                            <Select
                                className="option-select"
                                options={options}
                                // defaultValue={options[0]}
                                onChange={orderOnChange}
                                // menuIsOpen={true}
                                value={selectedOrderOption}
                            />
                        </div>
                    </div>
                    <ProductList productList={productList}></ProductList>
                    <ReactPaginate
                        previousLabel={<div className="pe-7s-angle-left" />}
                        nextLabel={<div className="pe-7s-angle-right" />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={numberPage}
                    />
                </div>

            </div>
        </div>
    );
}
export default ProductControl;