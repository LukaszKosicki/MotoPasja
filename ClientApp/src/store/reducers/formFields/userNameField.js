import * as actions from "../../actions/formFields/userNameField";
import { CLEAN_FIELD } from "../../actions/formFields/allFields";

export const userNameField = (state = {
    value: "",
    valid: false,
    invalid: false,
    statement: ""
}, action) => {
    switch (action.type) {
        case actions.SET_USERNAME_VALUE:
            return {
                ...state,
                value: action._value
            };
        case actions.USERNAME_FIELD_VALID:
            return {
                ...state,
                valid: true,
                invalid: false
            };
        case actions.USERNAME_FIELD_INVALID:
            return {
                ...state,
                valid: false,
                invalid: true
            };
        case actions.SET_USERNAME_STATEMENT:
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