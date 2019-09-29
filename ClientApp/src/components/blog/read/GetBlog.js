import React from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';
import LoadingPage from '../../common/LoadingPage';
import NoData from "../../common/NoData";
import { setAuthor, setEditingDate, setRatingStars } from "../../../store/actions/blog";

class GetBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null
        };
        this.getBlog();
    }

    getBlog = () => {
        fetch("blog/GetBlog/?id=" + this.props.blog.blogId)
            .then(resp => resp.json())
            .then(blog => {
                this.props.setAuthor(blog.author);
                this.props.setEditingDate(blog.dateOfLastEdition);
                this.setState({
                    blog: blog
                });
            })
    }

    render() {
        if (this.state.blog != null) {
            return (
                <Blog
                    {...this.state.blog}
                    getBlog={this.getBlog}
                />
            );
        } else if (this.state.blog == null) {
            return (
                <LoadingPage />
            );
        } else {
            return (
                <NoData />
                );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setAuthor: author => dispatch(setAuthor(author)),
    setEditingDate: date => dispatch(setEditingDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetBlog);