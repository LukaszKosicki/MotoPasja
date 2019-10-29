import React from "react";
import { CardColumns } from "reactstrap";
import LoadingPage from "../../common/LoadingPage";
import NoData from "../../common/NoData";
import BlogCard from "../blogsList/Card";

export default class BlogList extends React.Component {

    render() {
            if (this.props.blogs != null && this.props.blogs.length > 0) {
            var i = 1;
            return (
                <div>
                    <h1>Wszystkie blogi</h1>
                <CardColumns>
                    {
                        Object.keys(this.props.blogs).map((type) => {

                            return (
                                <BlogCard key={'blogCard' + (i++)}
                                    idBlog={this.props.blogs[type].id}
                                    title={this.props.blogs[type].title}
                                    miniature={this.props.blogs[type].miniature}
                                    text={this.props.blogs[type].contents}
                                    lastEdition={this.props.blogs[type].dateOfLastEdition}
                                    author={this.props.blogs[type].author}
                                    authorAvatar={this.props.blogs[type].authorAvatar}
                                />
                            );
                        })
                    }
                    </CardColumns>
                </div>
                );
            } else if (this.props.blogs == null) {
                return (
                    <div className="conteredContent">
                        <LoadingPage />
                    </div>
                );
            } else if (this.props.blogs.length === 0) {
                return (
                    <div className="conteredContent">
                        <NoData />
                    </div>
            );
        }     
    }
}
