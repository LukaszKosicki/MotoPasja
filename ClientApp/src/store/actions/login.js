const setUserName = userName => ({
    type: 'SET_USERNAME',
    userName
});

const isAuthentication = bool => ({
    type: 'IS_AUTHENTICATION',
    bool
});

export default setUserName;
export default isAuthentication;