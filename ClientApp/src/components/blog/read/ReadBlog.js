import React from 'react';
import GetBlog from './GetBlog';
import GetPosts from './GetPosts';
import { Button } from 'reactstrap';
import $ from 'jquery';
import BlogModel from '../create/BlogModel';
import { connect } from 'react-redux';
import { setBlogId } from '../../../store/actions/blog';

class ReadBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createTimePost: null,
            displayAddPostForm: 'none',
        };
    }

    componentDidMount() {
        this.props.setBlogId(this.props.match.params.id);
        var time = new Date();
        var fullTime = time.getFullYear() + '-' + (time.getMonth() < 10 ? '0' : '') + time.getMonth()
            + '-' + (time.getDay() < 10 ? '0' : '') + time.getDay() + ' '
            + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '')
            + time.getMinutes() + ':' + (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
        this.setState({
            createTimePost: fullTime,
        });
    }

    deleteBlog = () => {
        fetch("blog/delete/?blogId=" + this.props.blog.blogId, {
            method: "delete"
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp === true) {
                    this.props.history.push("/blogs");
                }
            })
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
            blogModelId: this.props.blog.blogId,
            title: title,
            contents: contents,
            dateOfAddition: this.state.createTimePost
        };

        fetch("post/createPost", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(resp => resp.json())
            .then(post => this.showHiddenNewPostForm())
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
                        anuluj={this.showHiddenNewPostForm}
                    />
                </div>
            );
        }
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
        var newPostStyles = {
            display: this.state.displayAddPostForm
        };
        return (
            <div>
                {
                    (this.props.match.params.id === this.props.blog.blogId) &&
                    <div style={blogStyles}>
                        <GetBlog
                            checkAuthor={this.checkAuthor}
                        />
                        <GetPosts />
                      
                            <div id="newPost" style={newPostStyles}>
                                {this.newPostForm()}
                            </div>
                        
                    </div>
                }
                {this.props.blog.author === this.props.user.user.userName &&
                    <div style={fixedStyles}>
                        <Button onClick={this.showHiddenNewPostForm} color="primary">Dodaj post</Button>
                        <Button onClick={this.deleteBlog} color="danger">Usuń blog</Button>
                    </div>
                }
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setBlogId: (blogId) => dispatch(setBlogId(blogId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadBlog);