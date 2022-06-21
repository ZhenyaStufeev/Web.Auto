import React, { useState, useRef } from "react";
import { REGEXP_PASSWORD, REGEXP_EMAIL } from "../../utils/regexp";

const AuthView = props => {
    const lookIconRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errors, setErrors] = useState([
        // "Неправильна комбінація е-пошти та паролю",
        // "Виникла невідома помилка"
    ]);

    const lookOnClick = () => {
        if (!lookIconRef.current.className.includes("__active")) {
            lookIconRef.current.className = "look pe-7s-look __active";
            passwordInputRef.current.type = "text";
        }
        else {
            lookIconRef.current.className = "look pe-7s-look";
            passwordInputRef.current.type = "password";
        }
    }

    const onClickLogin = () => {
        //TO DO REQUEST
        setErrors([]);
        let errors = [];
        if(!emailInput.match(REGEXP_EMAIL))
        {
            errors.push("E-пошта не відповідає стандартам");
        }
        if(!passwordInput.match(REGEXP_PASSWORD))
        {
            errors.push("Пароль повинен містити: тільки латиницю, не менше 1 літери алфавіту, хоча б 1 літеру верхнього регістру, не менше 1 цифрового символу, хоча б один спеціальний символ, більше 7 символів");
        }
        setErrors(errors);
    }

    const emailInputOnChnaged = (e) => {
        setEmailInput(e.target.value);
    }

    const passwordInputOnChange = (e) => {
        setPasswordInput(e.target.value);
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
                <button className="login-button btn btn-blue" onClick={onClickLogin}>Увійти</button>
                <span className="form-passRecover">Забули пароль?</span>
            </div>
        </div>
    );

}


export default AuthView;