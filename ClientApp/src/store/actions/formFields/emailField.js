import { email } from "../../../js/RegularExpressions";

export const SET_EMAIL_VALUE = "SET_EMAIL_VALUE";
export const EMAIL_FIELD_VALID = "EMAIL_FIELD_VALID";
export const EMAIL_FIELD_INVALID = "EMAIL_FIELD_INVALID";
export const SET_EMAIL_STATEMENT = "SET_EMAIL_STATEMENT";

export function setValue(_value) {
    return {
        type: "SET_EMAIL_VALUE",
        _value
    };
}

export function fieldValid() {
    return {
        type: "EMAIL_FIELD_VALID"
    };
}

export function fieldInvalid() {
    return {
        type: "EMAIL_FIELD_INVALID"
    };
}

export function setStatement(_statement) {
    return {
        type: "SET_EMAIL_STATEMENT",
        _statement
    };
}

export function checkEmailForEmailExpression(_email) {
    if (email.test(_email)) {
        return dispatch => {
            dispatch(fieldValid());
            dispatch(setStatement(""));
        };
    } else {
        return dispatch => {
            dispatch(fieldInvalid());
            dispatch(setStatement("Wprowadź poprawnie adres e-mail!"));
        };
    }
}