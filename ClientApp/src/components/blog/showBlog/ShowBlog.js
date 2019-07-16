import React from 'react';
import GetBlog from './GetBlog';
import GetPosts from './GetPosts';
import { Button } from 'reactstrap';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

export default class ShowBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogId: this.props.match.params.id,
            isDelete: false
        };
    }

    deleteBlog = () => {
        $.ajax({
            url: "blog/delete/?blogId=" + this.state.blogId,
            method: 'delete',
            success: (data) => {
                this.setState({
                    isDelete: data
                });
            }
        });
    }

    redirectToBlogsList = () => {
        return <Redirect to='/blogs' />
    }

    render() {
        var blogStyles = {
            marginBottom: '70px'
        };
        var blogOptionsStyles = {
            position: 'fixed',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
        };
        return (
            <div>
                {
                    this.state.isDelete && this.redirectToBlogsList()              
                }
                <div style={blogStyles}>
                    <GetBlog id={this.state.blogId} />
                    <GetPosts id={this.state.blogId} />
                </div>
                <div style={blogOptionsStyles}>
                    <Button onClick={this.deleteBlog} color="danger">Usuń blog</Button>
                </div>
            </div>
            );
    }
}