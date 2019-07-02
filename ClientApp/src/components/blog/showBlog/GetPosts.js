﻿import React from 'react';
import Post from './Post';

export default class GetPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    getPosts() {
        const url = 'post/getPosts/?blogId=' + this.props.id;
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({
                posts: data
            });
        };
        xhr.send();
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        if (this.state.posts != null) {
            var i = 1;
            return (
                Object.keys(this.state.posts).map((type) => {
                    return (
                        <Post key={'post' + (i++)}
                            {...this.state.posts[type]} />
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