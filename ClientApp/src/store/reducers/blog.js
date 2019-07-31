export default (state = 0, action) => {
    switch (action.type) {
        case "SET_BLOGID":
            return {
                blogId: action.blogId
            };
        default:
            return state;
    }
}