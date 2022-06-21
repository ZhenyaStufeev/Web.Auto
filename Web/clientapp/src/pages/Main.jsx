
import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { openMenuSidebar } from "../utils/StoreMethods/MenuControl";
import RandomProducts from "../components/RandomProducts";
import '../assets/css/main-page.css';
const MainPage = props => {
    return (
        <div className="main-page">
            <div className="main-carusel">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}>
                    <div className="img-block">
                        <img src="/AppData/images/5.jpg" />
                    </div>
                    <div className="img-block">
                        <img src="/AppData/images/2.jpg" />
                    </div>
                    <div className="img-block">
                        <img src="/AppData/images/7.jpg" />
                    </div>
                </Carousel>
            </div>
            <br />
            
            <button className="btn btn-blue catalog-btn" onClick={props.openMenuSidebar}>Каталог товарів</button>
            <br />
            <RandomProducts/>
        </div>
    );
}

const mapStateProps = state => {
    return {
    }
};

export default connect(mapStateProps, {
    openMenuSidebar
})(MainPage)