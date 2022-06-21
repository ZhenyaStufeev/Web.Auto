
import React from "react";
import '../assets/css/help.css';

const HelpPage = props => {
    let renderIconds = () => {
        return props.icons.map((item, key) => {
            let icon = (
                <div className="icon-item" key={key}>
                    <div className={item + " icon-item-icon"} key={key} />
                    <p>{item}</p>
                </div>
            );
            return icon;
        });
    }

    return (
        <>
            <h1>Іконки</h1>
            <div className="icon-block">
                {renderIconds()}
            </div>
        </>
    );
}
export default HelpPage;
