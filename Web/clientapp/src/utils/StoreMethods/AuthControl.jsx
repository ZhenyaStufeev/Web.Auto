import {
    AUTH_IS_CLOSE,
    AUTH_IS_OPEN,
    IS_LOGIN,
    IS_REGISTER
} from '../../utils/store/types';

export function openAuthModal() {
    return function (dispatch) {
        return dispatch({
            type: AUTH_IS_OPEN,
            authIsOpen: true
        });
    }
}

export function closeAuthModal() {
    return function (dispatch) {
        return dispatch({
            type: AUTH_IS_CLOSE,
            authIsOpen: false
        });
    }
}

export function setRegisterType() {
    return function (dispatch) {
        return dispatch({
            type: IS_REGISTER,
            typeAuth: IS_REGISTER
        });
    }
}

export function setLoginType() {
    return function (dispatch) {
        return dispatch({
            type: IS_LOGIN,
            typeAuth: IS_LOGIN
        });
    }
}