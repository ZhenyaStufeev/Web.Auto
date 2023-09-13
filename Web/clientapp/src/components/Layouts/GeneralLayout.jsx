import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout'
import NotFound from "../../pages/NotFound";
import HelpPage from "../../pages/HelpPage";
import 'react-notifications/lib/notifications.css';
import { iconsArray } from "../../assets/variables/Variables";
import "../../assets/css/pe-icon-7-stroke.css";
import '../../assets/css/auth.css';
import AuthModal from "../Account/AuthModal";
import { connect } from "react-redux";
import { getUserCredintials, setAuthorizationToken } from "../../utils/help";
import { UpdateUserCredentials } from "../../utils/StoreMethods/AuthControl";
import { NotificationContainer } from 'react-notifications';

const GeneralLayout = props => {

    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken);
        let user = getUserCredintials(localStorage.jwtToken);
        if (user != null) {
            console.log(user);
            props.UpdateUserCredentials(true, user.email, user.userName);
        }
    }

    return (
        <>
            <NotificationContainer />
            <AuthModal />

            <div className="general-layout">
                <Routes>
                    <Route path="/*" element={<MainLayout />}>
                    </Route>
                    <Route path="admin" element={<AdminLayout />}></Route>
                    <Route path="help" element={<HelpPage icons={iconsArray} />}></Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}
//export default GeneralLayout;

const mapStateProps = state => {
    return {

    }
};

export default connect(mapStateProps, {
    UpdateUserCredentials
})(GeneralLayout)