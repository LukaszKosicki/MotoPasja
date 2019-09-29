import * as actions from "../actions/user";

export const user = (state = { user: {UserName: "", Email: "", Avatar: ""}, isOnline: false }, action) => {
    switch (action.type) {
        case actions.IS_LOGGED:
            return { user: action.user, isOnline: true };
        case actions.NOT_LOGGED: {
            return {
                user: { UserName: "", Email: "" }, isOnline: false
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

        default:
            return state;
    }
};