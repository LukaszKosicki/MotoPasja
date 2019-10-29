import { nullOrEmpty } from "../../../js/RegularExpressions";

export const SET_CONFIRMED_PASSWORD_VALUE = "SET_CONFIRMED_PASSWORD_VALUE";
export const CONFIRMED_PASSWORD_FIELD_VALID = "CONFIRMED_PASSWORD_FIELD_VALID";
export const CONFIRMED_PASSWORD_FIELD_INVALID = "CONFIRMED_PASSWORD_FIELD_INVALID";
export const SET_CONFIRMED_PASSWORD_STATEMENT = "SET_CONFIRMED_PASSWORD_STATEMENT";

export function setValue(_value) {
    return {
        type: "SET_CONFIRMED_PASSWORD_VALUE",
        _value
    };
}

export function fieldValid() {
    return {
        type: "CONFIRMED_PASSWORD_FIELD_VALID"
    };
}

export function fieldInvalid() {
    return {
        type: "CONFIRMED_PASSWORD_FIELD_INVALID"
    };
}

export function setStatement(_statement) {
    return {
        type: "SET_CONFIRMED_PASSWORD_STATEMENT",
        _statement
    };
}

export function checkConfirmedPassword(_password, _confirmedPassword) {
    if (_password === _confirmedPassword && nullOrEmpty.test(_confirmedPassword)) {
        return dispatch => {
            dispatch(fieldValid());
            dispatch(setStatement(""));
        };
    } else {
        return dispatch => {
            dispatch(fieldInvalid());
            dispatch(setStatement("Wprowadzone hasła muszą być takie same!"));
        }
    }
}