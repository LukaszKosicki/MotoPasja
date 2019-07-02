import React from "react";
import GetBlogs from './GetBlogs';
import './CardStyles.css';

export default class BlogsList extends React.Component {
    render() {
        return (
            <div>
                <GetBlogs />
            </div>
            );
    }
}
