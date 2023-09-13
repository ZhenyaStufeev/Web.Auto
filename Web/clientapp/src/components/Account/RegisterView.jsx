import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { REGEXP_PASSWORD, REGEXP_EMAIL } from "../../utils/regexp";
import { signUp } from "../../utils/request";
import {NotificationContainer, NotificationManager} from 'react-notifications';
const RegisterView = props => {

    const lookIconRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const [userNameInput, setUserNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const [errors, setErrors] = useState([]);

    const lookOnClick = () => {
        if (!lookIconRef.current.className.includes("__active")) {
            lookIconRef.current.className = "look pe-7s-look __active";
            passwordInputRef.current.type = "text";
            confirmPasswordInputRef.current.type = "text";
        }
        else {
            lookIconRef.current.className = "look pe-7s-look";
            passwordInputRef.current.type = "password";
            confirmPasswordInputRef.current.type = "password";
        }
    }

    const onClickRegister = () => {
        //TO DO REQUEST
        // NotificationManager.success('Реєстрація аккаунта пройшла успішно. Тепер ви можете ввійти!', 'Успішна операція');
        let _errors = [];
        if (!emailInput.match(REGEXP_EMAIL)) {
            _errors.push("E-пошта не відповідає стандартам");
        }
        if (passwordInput !== confirmPasswordInput) {
            _errors.push("Паролі не співпадають");
        }
        if (!passwordInput.match(REGEXP_PASSWORD)) {
            _errors.push("Пароль повинен містити: тільки латиницю, не менше 1 літери алфавіту, хоча б 1 літеру верхнього регістру, не менше 1 цифрового символу, хоча б один спеціальний символ, більше 7 символів");
        }
        if(_errors.length > 0)
        {
            setErrors(_errors);
        }
        else
        {
            signUp(emailInput, passwordInput, userNameInput)
            .then(result => {
                if(result.data.succeeded === true)
                {
                    NotificationManager.success('Реєстрація аккаунта пройшла успішно. Тепер ви можете ввійти!', 'Успішна операція');
                    props.closeModal();
                }
            })
            .catch(err => {
                let server_errors = err.response.data.errors;
                setErrors(server_errors);
            });
        }
    }

    const userNameInputOnChnaged = (e) => {
        setUserNameInput(e.target.value);
    }

    const emailInputOnChnaged = (e) => {
        setEmailInput(e.target.value);
    }

    const passwordInputOnChange = (e) => {
        setPasswordInput(e.target.value);
    }

    const confirmPasswordInputOnChange = (e) => {
        setConfirmPasswordInput(e.target.value);
    }

    const renderErrors = () => {
        let error_li = errors.map((item, key) => {
            return (
                <li key={key}><span className="pe-7s-close error" />{item}</li>
            )
        });
        if (error_li.length > 0) {
            return (
                <div className="auth-line errors">
                    <ul className="error-list">
                        {error_li}
                    </ul>
                </div>
            );
        }
    }

    return (
        <div className="auth-lines">
            {renderErrors()}
            <div className="auth-line">
                <div className="text">
                    Ім'я користувача
                </div>
                <input
                    type="text"
                    className="e-mail_input custom-input"
                    placeholder="Ім'я користувача"
                    onChange={userNameInputOnChnaged}
                    value={userNameInput}
                />
            </div>
            <div className="auth-line">
                <div className="text">
                    E-пошта
                </div>
                <input
                    type="email"
                    className="e-mail_input custom-input"
                    placeholder="Електронна пошта"
                    onChange={emailInputOnChnaged}
                    value={emailInput}
                />
            </div>
            <div className="auth-line">
                <div className="text">
                    Пароль
                </div>
                <input type="password"
                    ref={passwordInputRef}
                    className="password_input custom-input"
                    placeholder="Пароль"
                    onChange={passwordInputOnChange}
                    value={passwordInput}
                />
                <button className="look-button" onClick={lookOnClick}>
                    <div ref={lookIconRef} className="look pe-7s-look"></div>
                </button>
            </div>
            <div className="auth-line">
                <div className="text">
                    Повторіть пароль
                </div>
                <input type="password"
                    ref={confirmPasswordInputRef}
                    className="password_input custom-input"
                    placeholder="Повторіть пароль"
                    onChange={confirmPasswordInputOnChange}
                    value={confirmPasswordInput}
                />
            </div>
            <div className="auth-line">
                <button className="login-button btn btn-blue" onClick={onClickRegister}>Зареєструватись</button>
            </div>
            <div className="auth-line">
                <div className="user-terms">
                    Підтверджуючи реєстрацію, я приймаю умови
                    <span> <Link to="/">користувальницької угоди</Link></span>
                </div>
            </div>
        </div>
    );
}


export default RegisterView;