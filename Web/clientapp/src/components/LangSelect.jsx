import React, { useState } from "react";
import '../assets/css/lang.css';
const LangSelect = props => {

    const [langList, updateLangList] = useState([
        { id: 0, name: "Укр", isChecked: true },
        { id: 1, name: "Рус", isChecked: false },
        { id: 2, name: "Eng", isChecked: false },
    ])

    const langOnChange = (id) => {
        let newLangList = [];
        for (let i = 0; i < langList.length; ++i) {
            let item = langList[i];
            if (item.id === id) {
                item.isChecked = true;
            }
            else {
                item.isChecked = false;
            }
            newLangList.push(item);
        }
        updateLangList(newLangList);
    }

    const renderList = () => {
        return langList.map((item, key) => {
            if (item.isChecked === false) {
                return (
                    <li key={key} onClick={() => langOnChange(item.id)}>
                        {item.name}
                    </li>
                );
            }
        });
    }

    const renderSelectedItem = () => {
        for (let i = 0; i < langList.length; ++i) {
            let item = langList[i];
            if (item.isChecked === true) {
                return item.name;
            }
        }
    }

    return (
        <div className="lang-select">
            <div className="select-lang-block">
                <div className="lang-show-icon pe-7s-world"></div>
                <div className="text">{renderSelectedItem()}</div>
                <div className="lang-icon pe-7s-angle-down"></div>
            </div>
            <ul className="lang-list">
                {renderList()}
            </ul>
        </div>
    );
}
export default LangSelect;