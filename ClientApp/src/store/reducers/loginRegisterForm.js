import * as actions from "../actions/loginRegisterForm";

export const form = (state = {
    userName: {
        value: "", valid: false, invalid: false, satement: ""
    },
    email: {
        value: "", valid: false, invalid: false, statement: ""
    },
    password: {
        value: "", valid: false, invalid: false, statement: ""
    },
    confirmedPassword: {
        value: "", valid: false, invalid: false, statement: ""
    }
}, action) => {
    switch (action.type) {
        case actions.SET_USERNAME:
            return {
                ...state,
                userName: action.userName
            };
        case actions.SET_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case actions.SET_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case actions.SET_CONFIRMED_PASSWORD:
            return {
                ...state,
                confirmedPassword: action.confirmedPassword
            };
        case actions.RESET_FORM:
            return {
                userName: {
                    value: "", valid: false, invalid: false, satement: ""
                },
                email: {
                    value: "", valid: false, invalid: false, statement: ""
                },
                password: {
                    value: "", valid: false, invalid: false, statement: ""
                },
                confirmedPassword: {
                    value: "", valid: false, invalid: false, statement: ""
                }
            };
        default:
            return state;
    }
};