import React from 'react';
import Blog from './Blog';

export default class AddBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createTime: null
        };
    }

    componentDidMount() {
        var time = new Date();
        var fullTime = time.getHours() + ';' + time.getMinutes() + ';' + time.getSeconds();
        this.setState({
            createTime: fullTime
        });
    }

    render() {
        return (
            <div>
                <h1>Nowy blog</h1>
                <Blog
                    fullTime={this.state.createTime}
                />
            </div>
            );
    }
}