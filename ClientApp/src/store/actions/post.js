export const SET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";

export function setPosts(posts) {
    return {
        type: "GET_POSTS",
        posts
    };
}

export function getPostsFromServer(blogId) {
    return dispatch => {
        fetch("post/getPosts/?blogId=" + blogId, {method: "GET"})
            .then(res => res.json())
            .then(posts => {
                dispatch(setPosts(posts));
            });
    }
}
