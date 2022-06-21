
import React, { useState, useEffect } from "react";
import { RangeSlider } from 'rsuite';
import '../../assets/css/slider.css'

const PriceSection = props => {
    const [inputInvalid, setInputInvalid] = useState(false);
    const [inputMin, setInputMin] = useState(props.currentMinPrice);
    const [inputMax, setInputMax] = useState(props.currentMaxPrice);



    useEffect(() => {
        if (inputMin !== props.currentMinPrice && !inputInvalid /*input valid*/) {
            setInputMin(props.currentMinPrice);
        }

        if (inputMax !== props.currentMaxPrice && !inputInvalid /*input valid*/) {
            setInputMax(props.currentMaxPrice);
        }
    });

    const inputMinOnChange = (e) => {
        if (!isNaN(e.target.value)) {
            let num = parseInt(e.target.value);
            if (num >= props.minPrice && num <= props.currentMaxPrice) {
                setInputInvalid(false);
                setInputMin(num);
                props.priceOnChange([num, props.currentMaxPrice]);
            }
            else {
                setInputInvalid(true);
                setInputMin(e.target.value);
            }
        }
        else {
            setInputInvalid(true);
            setInputMin(e.target.value);
        }
    }

    const inputMinOnBlur = () => {
        inputMinOnChange({ target: { value: props.currentMinPrice } })
    }

    const inputMaxOnChange = (e) => {
        if (!isNaN(e.target.value)) {
            let num = parseInt(e.target.value);
            if (e.target.value >= props.currentMinPrice
                && e.target.value <= props.maxPrice) {
                setInputInvalid(false);
                setInputMax(num);
                props.priceOnChange([props.currentMinPrice, num]);
            }
            else {
                setInputInvalid(true);
                setInputMax(e.target.value);
            }
        }
        else {
            setInputInvalid(true);
            setInputMax(e.target.value);
        }
    }

    const inputMaxOnBlur = () => {
        inputMaxOnChange({ target: { value: props.currentMaxPrice } })
    }

    let input_class = inputInvalid === true ? "custom-input input-range invalid" : "custom-input input-range";

    return (
        <div className="select-section">
            <p className="filter-name">Оберіть діапазон цін:</p>
            <div className="price-inputs">
                <div className="filter__inline">
                    <label>від</label>
                    <input placeholder=""
                        className={input_class}
                        onChange={inputMinOnChange}
                        onBlur={inputMinOnBlur}
                        value={inputMin}
                    />
                </div>
                <div className="filter__inline">
                    <label>до</label>
                    <input placeholder=""
                        className={input_class}
                        onChange={inputMaxOnChange}
                        onBlur={inputMaxOnBlur}
                        value={inputMax}
                    />
                </div>

            </div>
            <div className="price-range-block">
                <RangeSlider
                    value={[props.currentMinPrice, props.currentMaxPrice]}
                    tooltip={false}
                    onChange={props.priceOnChange}
                    min={props.minPrice}
                    max={props.maxPrice}
                    />
            </div>
        </div>
    );
}
export default PriceSection;
