
import {
    CART_IS_OPEN,
    CART_IS_CLOSE,
    CHANGE_COUNT_PRODUCTS,
    SET_PRODUCTS_ID
} from "./types";

const initialState = {
    cartIsOpen: false,
    countAddedProducts: 0,
    productsId: []
}

export default function UpdateCartSidebar(state = initialState, action = {}) {
    switch (action.type) {      
        case CART_IS_CLOSE:
            {
                return Object.assign({}, state, { cartIsOpen: action.IsOpen });
            }
        case CART_IS_OPEN:
            {
                return Object.assign({}, state, { cartIsOpen: action.IsOpen });
            }
        case CHANGE_COUNT_PRODUCTS:
            {
                return Object.assign({}, state, { countAddedProducts: action.count });
            }
        case SET_PRODUCTS_ID:
            {
                localStorage.setItem('productsId', action.productsId);
                let length = action.productsId.length;            
                return Object.assign({}, state, { productsId: action.productsId, countAddedProducts: length });
            }
        default:
            {
                return state;
            }
    }
}



