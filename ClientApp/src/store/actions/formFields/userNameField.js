import { nullOrEmpty } from "../../../js/RegularExpressions";

export const SET_USERNAME_VALUE = "SET_USERNAME_VALUE";
export const USERNAME_FIELD_VALID = "USERNAME_FIELD_VALID";
export const USERNAME_FIELD_INVALID = "USERNAME_FIELD_INVALID";
export const SET_USERNAME_STATEMENT = "SET_USERNAME_STATEMENT";

export function setValue(_value) {
    return {
        type: "SET_USERNAME_VALUE",
        _value
    };
}

export function fieldValid() {
    return {
        type: "USERNAME_FIELD_VALID"
    };
}

export function fieldInvalid() {
    return {
        type: "USERNAME_FIELD_INVALID"
    };
}

export function setStatement(_statement) {
    return {
        type: "SET_USERNAME_STATEMENT",
        _statement
    };
}

export function checkUserNameForNullOrEmptyExpression(_userName) {
    if (nullOrEmpty.test(_userName)) {
        return dispatch => {
            dispatch(fieldValid());
        };
    } else {
        return dispatch => {
            dispatch(fieldInvalid());
            dispatch(setStatement("Wprowadź nazwę użytkownika!"));
        }
    }
}


