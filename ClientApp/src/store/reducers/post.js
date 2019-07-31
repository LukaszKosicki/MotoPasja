
export default (state = [], action) => {
    switch (action.type) {
        case "GET_POSTS":
            return {
                posts: action.posts
            };
        default:
            return state;
    }  
};
