import React from 'react';
import BlogCard from './Card';
import './CardStyles.css';
import $ from "jquery";
import { connect } from 'react-redux';

class GetBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null
        };
    }

    getBlogs = () => {
        $.ajax({
            url: "blog/getBlogs",
            method: "get",
            headers: { "Authorization": "Bearer " + localStorage.getItem("motoPasjaToken") },
            success: (result) => {
                this.setState({
                    blogs: result
                });
            }
        });
        /*
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'blog/GetBlogs', true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({
                blogs: data
            });
        };
        xhr.send(); */
    }

    componentDidMount() {
        this.getBlogs();
        console.log(this.props);
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

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(GetBlogs);