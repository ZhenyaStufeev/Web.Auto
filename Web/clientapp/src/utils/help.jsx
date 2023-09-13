
const { useRef, useEffect } = require("react");
const jwt_decode = require('jwt-decode');
const { default: axios } = require("axios");

const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const setLocalStorageCredintials = (token) => {
    if (token) {
        localStorage.setItem("jwtToken", token);
    }
}

const removeLocalStorageCredintials = () =>
{
    localStorage.removeItem("jwtToken");
}

const getUserCredintials = (token) => {
    let user = jwt_decode.default(token);
    let userName = user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    let email = user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    return { email: email, userName: userName };
}

const breakUpPrice = (value) => {
    if (!isNaN(value)) {
        let str_val = value.toString().split('').reverse().join('');
        let res_val = [];

        for (let i = 0; i < str_val.length; ++i) {
            res_val.push(str_val[i]);
            if ((i + 1) % 3 === 0 && i + 1 !== str_val.length) {
                res_val.push(' ');
            }
        }
        return res_val.reverse().join('');
    }
    return "";
}

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
}

module.exports = {
    breakUpPrice,
    useFocus,
    usePrevious,
    setAuthorizationToken,
    setLocalStorageCredintials,
    getUserCredintials,
    removeLocalStorageCredintials
};