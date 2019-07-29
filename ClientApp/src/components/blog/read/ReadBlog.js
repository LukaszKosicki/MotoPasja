import React from 'react';
import GetBlog from './GetBlog';
import GetPosts from './GetPosts';
import { Button } from 'reactstrap';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import BlogModel from '../create/BlogModel';

export default class ReadBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogId: this.props.match.params.id,
            createTimePost: null,
            displayAddPostForm: 'none'
        };
    }

    componentDidMount() {
        var time = new Date();
        var fullTime = time.getHours() + ';' + time.getMinutes() + ';' + time.getSeconds();
        this.setState({
            createTimePost: fullTime
        });
    }

    deleteBlog = () => {
        $.ajax({
            url: "blog/delete/?blogId=" + this.state.blogId,
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
            url: "post/createPost/?blogId=" + this.state.blogId,
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(post),
            success: (data) => {
                this.showHiddenNewPostForm();
            }
        });
    };

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
            overflowY: 'scroll',
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
                <div style={blogStyles}>
                    <GetBlog id={this.state.blogId} />
                    <GetPosts id={this.state.blogId} />
                </div>
                <div style={fixedStyles}>
                    <div style={newPostStyles}>
                        <h3>Nowy post</h3>
                        <BlogModel
                            modelId={this.state.createTimePost}
                            send={this.sendPostToServer}
                            model={'post'}
                        />
                    </div>
                    <div style={fixedMenu}>
                        <Button onClick={this.showHiddenNewPostForm} color="primary">Dodaj post</Button>
                        <Button onClick={this.deleteBlog} color="danger">Usuń blog</Button>
                    </div>
                </div>
            </div>
            );
    }
}