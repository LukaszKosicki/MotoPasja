import React from 'react';
import Post from './Post';
import getPosts from '../../../store/actions/post';
import { connect } from 'react-redux';
import { getPostsFromServer } from "../../../store/actions/post";
import LoadingPage from "../../common/LoadingPage";
import NoData from "../../common/NoData";

class GetPosts extends React.Component {
    constructor(props) {
        super(props);
    }
   
    componentDidMount() {
        this.props.getPosts(this.props.blog.blogId);
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
                            isAuthor={this.props.isAuthor}
                        />
                    );
                })
            );
        } else if (this.props.post.posts == null) {
            return (
                <LoadingPage />
            );
        } else {
            return (
                <NoData />
                );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getPosts: (blogId) => dispatch(getPostsFromServer(blogId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetPosts);


