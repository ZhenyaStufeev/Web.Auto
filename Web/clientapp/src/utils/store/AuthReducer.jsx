import {
    AUTH_IS_CLOSE,
    AUTH_IS_OPEN,
    IS_LOGIN,
    IS_REGISTER,
    UPDATE_USER_CREDENTIALS
} from "./types";

const initialState = {
    authModalIsOpen: false,
    typeAuth: IS_LOGIN,

    isAutorized: false,
    email: null,
    userName: null
}

export default function UpdateAuthModal(state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_IS_CLOSE:
            {
                return Object.assign({}, state, { authModalIsOpen: action.authIsOpen });
            }
        case AUTH_IS_OPEN:
            {
                return Object.assign({}, state, { authModalIsOpen: action.authIsOpen });
            }
        case IS_LOGIN:
            {
                return Object.assign({}, state, { typeAuth: action.typeAuth });
            }
        case IS_REGISTER:
            {
                return Object.assign({}, state, { typeAuth: action.typeAuth });
            }
        case UPDATE_USER_CREDENTIALS:
            {
                return Object.assign({}, state, { isAutorized: action.isAutorized, email: action.email, userName: action.userName });
            }
        default:
            {
                return state;
            }
    }
}



