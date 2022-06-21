import {
    MENU_IS_CLOSE,
    MENU_IS_OPEN,
} from '../../utils/store/types';

export function openMenuSidebar() {
    return function (dispatch) {
        return dispatch({
            type: MENU_IS_OPEN,
            IsOpen: true
        });
    }
}

export function closeMenuSidebar() {
    return function (dispatch) {
        return dispatch({
            type: MENU_IS_CLOSE,
            IsOpen: false
        });
    }
}