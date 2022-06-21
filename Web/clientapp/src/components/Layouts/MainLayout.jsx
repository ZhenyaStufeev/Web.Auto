import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { usePrevious } from "../../utils/help";

import { Route, Routes } from "react-router-dom";
import Nav from "../Nav/Nav";
import '../../assets/css/main.css';
import MainPage from '../../pages/Main';
import ProductPage from '../../pages/Product';
import Menu from "../Menu";
import Cart from "../Cart/Cart";
import Footer from "../Footer";


const MainLayout = props => {

    const mainRef = useRef();
    const history = useNavigate();

    useEffect(() => {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="main-layout" ref={mainRef}>
            <Menu />
            <Cart />
            <Nav />
            <Routes>
                <Route path="/catalog/*" element={<ProductPage />}></Route>
                <Route path="/" element={<MainPage />}></Route>
            </Routes>
            <Footer />
        </div>
    );
}
export default MainLayout;