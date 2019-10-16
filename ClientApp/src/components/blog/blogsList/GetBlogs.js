import React from "react";
import BlogList from "../blogsList/BlogList";

export default class GetBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: null
        };

        this.getBlogs();
    }

    getBlogs = () => {
        fetch("blog/getBlogs")
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    blogs: resp
                });
            })
    }
    
    render() {
        return (
            <BlogList
                blogs={this.state.blogs}
            />
        );
    }
}
