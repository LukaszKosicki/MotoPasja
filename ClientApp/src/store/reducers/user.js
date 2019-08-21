import * as actions from "../actions/user";

export const user = (state = { user: {UserName: "", Email: ""}, isOnline: false }, action) => {
    switch (action.type) {
        case actions.IS_LOGGED:
            return { user: action.user, isOnline: true };
        case actions.NOT_LOGGED: {
            return {
                user: {UserName: "", Email: ""}, isOnline: false };
        }       
        default:
            return state;
    }
};