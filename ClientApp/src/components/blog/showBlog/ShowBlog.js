import React from 'react';
import GetBlog from './GetBlog';
import GetPosts from './GetPosts';

export default class ShowBlog extends React.Component {
    render() {
        return (
            <div>
                <GetBlog id={this.props.match.params.id} />
                <GetPosts id={this.props.match.params.id} />
            </div>
            );
    }
}