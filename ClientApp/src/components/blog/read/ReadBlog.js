import React from 'react';
import GetBlog from './GetBlog';
import GetPosts from './GetPosts';
import { Button } from 'reactstrap';
import $ from 'jquery';
import BlogModel from '../create/BlogModel';
import GetPostsFromServer from '../../../js/Post';
import { connect } from 'react-redux';
import getPosts from '../../../store/actions/post';
import setBlogId from '../../../store/actions/blog';

class ReadBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createTimePost: null,
            displayAddPostForm: 'none'
        };
        this.getPosts = GetPostsFromServer.bind(this);
    }

    componentDidMount() {
        this.props.setBlogId(this.props.match.params.id);
        var time = new Date();
        var fullTime = time.getHours() + ';' + time.getMinutes() + ';' + time.getSeconds();
        this.setState({
            createTimePost: fullTime,
        });
    }

    deleteBlog = () => {
        $.ajax({
            url: "blog/delete/?blogId=" + this.props.blog.blogId,
            method: 'delete',
            success: (result) => {
                if (result === true) {
                    this.props.history.push('/blogs');
                }
            }
        });
    }

    showHiddenNewPostForm = () => {
        if (this.state.displayAddPostForm == 'none') {
            this.setState({
                displayAddPostForm: 'block'
            });
        } else {
            this.setState({
                displayAddPostForm: 'none'
            });
        }
    }

    sendPostToServer = (title, contents) => {
        var post = {
            title: title,
            contents: contents,
            dateOfAddition: this.state.createTimePost
        };

        $.ajax({
            url: "post/createPost/?blogId=" + this.props.blog.blogId,
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(post),
            success: (data) => {
                this.showHiddenNewPostForm();
                this.getPosts();
            }
        });
    };

    newPostForm = () => {
        if (this.state.displayAddPostForm == 'block') {
            return (
                <div>
                    <h3>Nowy post</h3>
                    <BlogModel
                        modelId={this.state.createTimePost}
                        send={this.sendPostToServer}
                        model={'post'}
                        anuluj={this.cancel}
                    />
                </div>
            );
        }
    }

    cancel = () => {
        this.showHiddenNewPostForm();
    }

    render() {
        var blogStyles = {
            marginBottom: '70px'
        };
        var fixedStyles = {
            position: 'fixed',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            backgroundColor: 'lightgrey',
            padding: '10px',
            maxHeight: '80vh'
        };
        var fixedMenu = {
            backgroundColor: 'grey',
            padding: '10px'
        };
        var newPostStyles = {
            display: this.state.displayAddPostForm
        };
        return (
            <div>
                {
                    (this.props.match.params.id === this.props.blog.blogId) &&
                    <div style={blogStyles}>
                        <GetBlog />
                        <GetPosts />
                        <div id="newPost" style={newPostStyles}>
                            {this.newPostForm()}
                        </div>
                    </div>
                }
                <div style={fixedStyles}>
                    <Button onClick={this.showHiddenNewPostForm} color="primary">Dodaj post</Button>
                    <Button onClick={this.deleteBlog} color="danger">Usuń blog</Button>
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getPosts: (posts) => dispatch(getPosts(posts)),
    setBlogId: (blogId) => dispatch(setBlogId(blogId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadBlog);