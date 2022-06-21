import {
    MENU_IS_OPEN,
    MENU_IS_CLOSE
} from "./types";

const initialState = {
    sidebarIsOpen: false,
}

export default function UpdateMenuSidebar(state = initialState, action = {}) {
    switch (action.type) {
        case MENU_IS_CLOSE:
            {
                return Object.assign({}, state, { sidebarIsOpen: action.IsOpen });
            }
        case MENU_IS_OPEN:
            {
                return Object.assign({}, state, { sidebarIsOpen: action.IsOpen });
            }
        default:
            {
                return state;
            }
    }
}



