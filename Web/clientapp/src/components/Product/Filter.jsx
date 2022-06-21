
import React, { useEffect, useState, useRef } from "react";
import PriceSection from "./PriceSection";
const Filter = props => {

    const IsSearch_count_items = 6;

    const checkBoxOnChanged = props.unCheckFilter;

    const renderFilters = () => {
        return props.filters.map((item, key) => {
            let childrens = [];
            childrens = item.childrens.map((child, j) => {
                let display_format = child.isVisible === true ? "flex" : "none";
                let fValue = (
                    <li key={j} style={{ display: display_format }}>
                        <input
                            className="filter__item" type="checkbox"
                            id={child.id}
                            checked={child.isSelected}
                            onChange={() => checkBoxOnChanged(child.id)}
                        />
                        <label className="form-check-label" htmlFor={child.id}>
                            {child.name}
                        </label>
                    </li>
                );
                return fValue;
            });

            let fv_class = childrens.length > IsSearch_count_items ? " search" : "";
            let display_format = item.isVisible === true ? "block" : "none";
            let component = (
                <div className="filter-section" key={key}>
                    <p className="filter-name"
                        onClick={() => props.changeVisibilityFilterGroup(item.id)}
                    >{item.name}:
                        <span className={"pe-7s-angle-up icon-arrow" + (item.isVisible === false ? " active" : "")} />
                    </p>

                    <div style={{ display: display_format }}>
                        {
                            childrens.length > IsSearch_count_items ? (
                                <div className="input-wrapper">
                                    <div className="icon-search pe-7s-search"></div>
                                    <input className="custom-input" placeholder="Пошук"
                                        onChange={(e) => props.fNameSearchOnchange(item.id, e.target.value)}></input>
                                </div>
                            ) : <></>
                        }

                        <ul className={"filter-values" + fv_class}>
                            {childrens}
                        </ul>
                    </div>
                </div>
            )
            return component;
        });
    }

    return (
        <div className={"filter-group " + props.className} >
            <div className="side-bar-close pe-7s-close" onClick={props.closeHandler}></div>
            <div className="filter-wrapper">
                <div>
                    {renderFilters()}
                </div>
                <PriceSection {...props}></PriceSection>
            </div>
        </div>
    );
}
export default Filter;
