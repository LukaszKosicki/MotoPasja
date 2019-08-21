import React from 'react';
import Blog from './Blog';
import { connect } from 'react-redux';
import LoadingPage from '../../common/LoadingPage';
import NoData from "../../common/NoData";

class GetBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null
        };
    }

    getBlog = () => {
        const url = 'blog/GetBlog/?id=' + this.props.blog.blogId;
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.props.checkAuthor(data.author);
            this.setState({
                blog: data
            });
        };
        xhr.send();
    }

    componentDidMount() {
        this.getBlog();
    }

    render() {
        if (this.state.blog != null) {
            return (
                <Blog
                    {...this.state.blog}
                    getBlog={this.getBlog}
                    isAuthor={this.props.isAuthor}
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

export default connect(mapStateToProps)(GetBlog);