import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import '../assets/css/catalog.css';
import { getCategories } from "../utils/request";
import { Link } from 'react-router-dom';
import { closeMenuSidebar } from '../utils/StoreMethods/MenuControl';
const CatalogList = props => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        if (categoryList != null)
            if (categoryList.length === 0) {
                getCategories()
                    .then(result => {
                        setCategoryList(result.data.result);
                    })
                    .catch(res => {
                        console.log(res);
                    });
            }
    })

    const renderCategories = () => {
        if (categoryList != null)
            return categoryList.map((item, key) => {
                return (
                    <li key={key} onClick={props.closeMenuSidebar}>
                        <Link to={"/catalog/" + item.id}
                        >
                            {item.name}
                            <div className="icon pe-7s-angle-right"></div>
                        </Link>
                    </li>
                );
            })
    }

    return (
        <div className="catalog">
            <ul className="catalog-list">
                {renderCategories()}
            </ul>
        </div>
    );
}

const mapStateProps = state => {
    return {

    }
};

export default connect(mapStateProps, {
    closeMenuSidebar
})(CatalogList)