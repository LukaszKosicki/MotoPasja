import React from 'react';
import LoadingPage from "../../common/LoadingPage";
import NoData from '../../common/NoData';
import { CardColumns } from "reactstrap";
import BlogCard from "./Card";

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
        if (this.state.blogs != null && this.state.blogs.length > 0) {
            var i = 1;
            return (
                <CardColumns>
                    {
                        Object.keys(this.state.blogs).map((type) => {

                            return (
                                <BlogCard key={'blogCard' + (i++)}
                                    idBlog={this.state.blogs[type].id}
                                    title={this.state.blogs[type].title}
                                    miniature={this.state.blogs[type].miniature}
                                    text={this.state.blogs[type].contents}
                                    lastEdition={this.state.blogs[type].dateOfLastEdition}
                                    author={this.state.blogs[type].author}
                                    authorAvatar={this.state.blogs[type].authorAvatar}
                                />
                            );
                        })
                    }
                </CardColumns>
            );
        } else if (this.state.blogs == null) {
            return (
                <LoadingPage/>
            );
        } else if (this.state.blogs.length === 0) {
            return (
                <NoData />
                );
        }     
    }
}
