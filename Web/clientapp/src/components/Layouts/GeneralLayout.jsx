import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout'
import NotFound from "../../pages/NotFound";
import HelpPage from "../../pages/HelpPage";
import 'react-notifications/lib/notifications.css';
import { iconsArray } from "../../assets/variables/Variables";
import "../../assets/css/pe-icon-7-stroke.css";
import '../../assets/css/auth.css';
import AuthModal from "../Account/AuthModal";
const GeneralLayout = props => {
    return (
        <>
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
export default GeneralLayout;