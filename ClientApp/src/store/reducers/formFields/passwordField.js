import * as actions from "../../actions/formFields/passwordField";
import { CLEAN_FIELD } from "../../actions/formFields/allFields";

export const passwordField = (state = {
    value: "",
    valid: false,
    invalid: false,
    statement: ""
}, action) => {
    switch (action.type) {
        case actions.SET_PASSWORD_VALUE:
            return {
                ...state,
                value: action._value
            };
        case actions.PASSWORD_FIELD_VALID:
            return {
                ...state,
                valid: true,
                invalid: false
            };
        case actions.PASSWORD_FIELD_INVALID:
            return {
                ...state,
                valid: false,
                invalid: true
            };
        case actions.SET_PASSWORD_STATEMENT:
            return {
                ...state,
                statement: action._statement
            };
        case CLEAN_FIELD:
            return {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            };
        default:
            return state;
    }
};