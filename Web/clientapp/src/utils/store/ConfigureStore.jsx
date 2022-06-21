import { configureStore } from '@reduxjs/toolkit'

import AuthReducer from './AuthReducer';
import MenuReducer from './MenuReducer';
import CartReducer from './CartReducer';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        generalMenu: MenuReducer,
        cart: CartReducer
    }
})

export default store;