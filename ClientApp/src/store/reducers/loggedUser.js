import * as actions from "../actions/loggedUser";

export const user = (state = { user: { userName: "", email: "", avatar: "" }, isOnline: false, isAnswer: false }, action) => {
    switch (action.type) {
        case actions.IS_LOGGED:
            return { user: action.user, isOnline: true, isAnswer: true };
        case actions.NOT_LOGGED: {
            return {
                user: { userName: "", email: "", avatar: "" }, isOnline: false, isAnswer: true
            };
        };
        case actions.UPDATE_AVATAR:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.avatar
                }
            };
        case actions.UPDATE_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    userName: action.userName
                }
            };
        default:
            return state;
    }
};