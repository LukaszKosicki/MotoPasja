import React from 'react';
import BlogCard from './Card';

export default class GetBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null
        };
    }

    getBlogs() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'blog/GetBlogsList', true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({
                blogs: data
            });
        };
        xhr.send();
    }

    componentDidMount() {
        this.getBlogs();
    }

    render() {
        if (this.state.blogs != null && this.state.blogs.length > 0) {
            var i = 1;
            return (
                Object.keys(this.state.blogs).map((type) => {
                    return (
                        <BlogCard key={'blogCard' + (i++)}
                            {...this.state.blogs[type]} />
                    );
                })
            );
        } else if (this.state.blogs == null) {
            return (
                <h1>Ładowanie</h1>
            );
        } else if (this.state.blogs.length === 0) {
            return (
                <h1>Brak</h1>
                );
        }
        
    }
}