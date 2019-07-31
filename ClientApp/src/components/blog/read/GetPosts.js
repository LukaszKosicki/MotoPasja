import React from 'react';
import Post from './Post';
import getPosts from '../../../store/actions/post';
import { connect } from 'react-redux';
import GetPostsFromServer from '../../../js/Post';

class GetPosts extends React.Component {
    constructor(props) {
        super(props);
        this.getPosts = GetPostsFromServer.bind(this);
    }
    /*
    getPosts = () => {
        const url = 'post/getPosts/?blogId=' + this.props.id;
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.props.getPosts(data);
            console.log(this.props);
        };
        xhr.send();
    }
    */
    componentDidMount() {
        this.getPosts();
    }

    render() {
        if (this.props.post.posts != null) {
            var i = 1;
            return (
                Object.keys(this.props.post.posts).map((type) => {
                    return (
                        <Post key={'post' + (i++)}
                            {...this.props.post.posts[type]}
                            delete={this.deletePost}
                        />
                    );
                })
            );
        } else {
            return (
                <h1>brak</h1>
                );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getPosts: (posts) => dispatch(getPosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetPosts);


