export default (state = { blogId: 0, author: "" }, action) => {
    switch (action.type) {
        case "SET_BLOGID":
            return {
                ...state,
                blogId: action.blogId
            };
        case "SET_AUTHOR": 
            return {
            ...state,
             author: action.author 
            };
        case "SET_EDITING_DATE":
            return {
                ...state,
                editingDate: action.date
            };
        default:
            return state;
    }
}