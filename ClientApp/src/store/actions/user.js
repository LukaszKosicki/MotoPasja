export const IS_LOGGED = "IS_LOGGED";
export const NOT_LOGGED = "NOT_LOGGED";
export const UPDATE_AVATAR = "UPDATE_AVATAR";

export function isLogged(user) {
    return {
        type: "IS_LOGGED",
        user
    };
}

export function notLogged() {
    return {
        type: "NOT_LOGGED"
    };
}

export function updateAvatar(avatar) {
    return {
        type: "UPDATE_AVATAR",
        avatar
    }
}



export function getUser() {
    return dispatch => {
        fetch("user/getUser")
            .then(res => res.json())
            .then(user => {
                dispatch(isLogged(user));
            })
            .catch(error => {
                dispatch(notLogged());
            })
    }
}