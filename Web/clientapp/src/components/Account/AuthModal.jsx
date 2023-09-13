import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import { ReactComponent as GoogleLogo } from '../../assets/img/svg/google.svg';
import {
    IS_LOGIN,
    IS_REGISTER
} from "../../utils/store/types";
import { closeAuthModal, setLoginType, setRegisterType, UpdateUserCredentials } from '../../utils/StoreMethods/AuthControl';


const AuthModal = props => {

    const [modalIsOpen, setModalIsOpen] = useState(props.modalIsOpen);
    const [authType, setAuthType] = useState(props.typeAuth);

    useEffect(() => {
        if (modalIsOpen !== props.modalIsOpen)
            setModalIsOpen(props.modalIsOpen);

        if (authType !== props.typeAuth)
            setAuthType(props.typeAuth);
    });

    let authView = authType === IS_LOGIN ?
        <LoginView
            closeModal={props.closeAuthModal}
            UpdateUserCredentials={props.UpdateUserCredentials}
        /> :
        <RegisterView
            closeModal={props.closeAuthModal}
        />;
    let login_class = "auth-tab" + (authType === IS_LOGIN ? " __active" : "");
    let register_class = "auth-tab" + (authType === IS_REGISTER ? " __active" : "");

    if (modalIsOpen === true) {
        return (
            <div className="auth-modal">
                <div className="side-bar-close pe-7s-close" onClick={props.closeAuthModal}></div>
                <div className="auth-header">
                    <div
                        className={login_class}
                        onClick={props.setLoginType}>
                        Вхід
                    </div>

                    <div className="social-login desktop">
                        <div className="text">Увійти за допомогою</div>
                        <div className="google-logo">{<GoogleLogo />}</div>
                    </div>
                    <div
                        className={register_class}
                        onClick={props.setRegisterType}>
                        Реєстрація
                    </div>
                </div>
                <div className="auth-form">
                    {authView}
                </div>
                <div className="mobile-buttons">
                    <div className="social-button">
                        <div className="google-logo">{<GoogleLogo />}</div>
                        <div className="text">Ввійти через Google</div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <></>;
    }

}

const mapStateProps = state => {
    return {
        modalIsOpen: state.auth.authModalIsOpen,
        typeAuth: state.auth.typeAuth
    }
};

export default connect(mapStateProps, {
    closeAuthModal,
    setLoginType,
    setRegisterType,
    UpdateUserCredentials
})(AuthModal)