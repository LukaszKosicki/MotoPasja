
export default function GetPostsFromServer() {
    const url = 'post/getPosts/?blogId=' + this.props.blog.blogId;
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        this.props.getPosts(data);
    };
    xhr.send();
}