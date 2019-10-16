export const SET_USERNAME = "SET_USERNAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_CONFIRMED_PASSWORD = "SET_CONFIRMED_PASSWORD";
export const RESET_FORM = "RESET_FORM";

export function setUserName(userName) {
    return {
        type: "SET_USERNAME",
        userName
    };
}

export function setEmail(email) {
    return {
        type: "SET_EMAIL",
        email
    };
}

export function setPassword(password) {
    return {
        type: "SET_PASSWORD",
        password
    };
}

export function setConfirmedPassword(confirmedPassword) {
    return {
        type: "SET_CONFIRMED_PASSWORD",
        confirmedPassword
    };
}

export function resetForm() {
    return {
        type: "RESET_FORM"
    }
}