export const SET_POSTS = "GET_POSTS";

export function getPosts(posts) {
    return {
        type: "GET_POSTS",
        posts: posts
    };
}

export function getPostsFromServer(blogId) {
    return dispatch => {
        fetch("post/getPosts/?blogId=" + blogId, {method: "GET"})
            .then(res => res.json())
            .then(posts => {
                dispatch(getPosts(posts));
            });
    }
}

/*
const getPost = posts => ({
    type: 'GET_POSTS',
    posts
});

export default getPost;*/