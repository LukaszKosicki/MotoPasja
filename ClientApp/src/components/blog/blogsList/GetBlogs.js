import React from 'react';
import BlogCard from './Card';
import './CardStyles.css';
import $ from "jquery";
import { connect } from 'react-redux';
import LoadingPage from "../../common/LoadingPage";
import NoData from '../../common/NoData';

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
            success: (result) => {
                this.setState({
                    blogs: result
                });
            }
        });
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
                <LoadingPage/>
            );
        } else if (this.state.blogs.length === 0) {
            return (
                <NoData />
                );
        }     
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(GetBlogs);