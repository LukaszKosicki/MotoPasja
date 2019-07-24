import React from 'react';
import BlogModel from './BlogModel';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

export default class CreateBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createTime: ""
        };
    }

    componentDidMount() {
        var time = new Date();
        var fullTime = time.getHours() + ';' + time.getMinutes() + ';' + time.getSeconds();
        this.setState({
            createTime: fullTime
        });
    }

    redirectToBlog = (id) => {
        this.props.history.push('/blog/' + id);
    }

    redirectToBlogsList = () => {
        this.props.history.push('/blogs');
    }

    sendBlogToServer = (title, contents) => {
        var blog = {
            title: title,
            contents: contents,
            dateOfAddition: this.state.createTime
        };

        $.ajax({
            url: "blog/createBlog",
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(blog),
            success: (data) => {
                this.redirectToBlog(data);
            },
            error: function () {
                alert("błąd połączenia");
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Nowy blog</h1>
                <BlogModel
                    send={this.sendBlogToServer}
                    anuluj={this.redirectToBlogsList}
                    modelId={this.state.createTime}
                />
            </div>
            );
    }
    
}