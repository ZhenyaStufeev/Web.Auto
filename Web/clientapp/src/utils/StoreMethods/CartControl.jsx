import {
    CART_IS_CLOSE,
    CART_IS_OPEN,
    CHANGE_COUNT_PRODUCTS,
    SET_PRODUCTS_ID
} from '../../utils/store/types';

export function openCartSidebar() {
    return function (dispatch) {
        return dispatch({
            type: CART_IS_OPEN,
            IsOpen: true
        });
    }
}

export function closeCartSidebar() {
    return function (dispatch) {
        return dispatch({
            type: CART_IS_CLOSE,
            IsOpen: false
        });
    }
}

export function changeCountProducts(count) {
    return function (dispatch) {
        return dispatch({
            type: CHANGE_COUNT_PRODUCTS,
            count: count
        });
    }
}

export function setProductsId(productsId) {
    return function (dispatch) {
        return dispatch({
            type: SET_PRODUCTS_ID,
            productsId: productsId
        });
    }
}