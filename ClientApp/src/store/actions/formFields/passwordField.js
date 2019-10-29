import { nullOrEmpty, password } from "../../../js/RegularExpressions";

export const SET_PASSWORD_VALUE = "SET_PASSWORD_VALUE";
export const PASSWORD_FIELD_VALID = "PASSWORD_FIELD_VALID";
export const PASSWORD_FIELD_INVALID = "PASSWORD_FIELD_INVALID";
export const SET_PASSWORD_STATEMENT = "SET_PASSWORD_STATEMENT";

export function setValue(_value) {
    return {
        type: "SET_PASSWORD_VALUE",
        _value
    };
}

export function fieldValid() {
    return {
        type: "PASSWORD_FIELD_VALID"
    };
}

export function fieldInvalid() {
    return {
        type: "PASSWORD_FIELD_INVALID"
    };
}

export function setStatement(_statement) {
    return {
        type: "SET_PASSWORD_STATEMENT",
        _statement
    };
}

export function checkPasswordForPasswordExpression(_password) {
    if (password.test(_password)) {
        return dispatch => {
            dispatch(fieldValid());
            dispatch(setStatement(""));
        };
    } else {
        return dispatch => {
            dispatch(fieldInvalid());
            dispatch(setStatement(
                "Hasło musi składać się z minimum 8 znaków. Musi zawierać jedną małą i jedną dużą literę, liczbę oraz znak specjalny!"));
        };
    }
}

export function checkPasswordForNullOrEmptyExpression(_password) {
    if (nullOrEmpty.test(_password)) {
        return dispatch => {
            dispatch(fieldValid());
            dispatch(setStatement(""));
        };
    } else {
        return dispatch => {
            dispatch(fieldInvalid());
            dispatch(setStatement("Wprowadź hasło!"));
        };
    }
}
