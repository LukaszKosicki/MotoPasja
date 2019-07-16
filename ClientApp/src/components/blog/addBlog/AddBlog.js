import React from 'react';
import BlogModel from './BlogModel';
import $ from 'jquery';

export default class AddBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            contents: "",
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

    getTitle = (text) => {
        this.setState({
            title: text
        });
    }

    getContent = (text) => {
        this.setState({
            contents: text
        });
    }

    checkForm = () => {
        if (this.state.title && this.state.contents) {
            this.sendBlogToServer();
        } else {
            alert("pusty");
        }
    }

    sendBlogToServer = () => {
        var blog = {
            title: this.state.title,
            contents: this.state.contents,
            dateOfAddition: this.state.createTime
        };

        $.ajax({
            url: "blog/addBlog",
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(blog),
            success: function (data) {
                console.log(data);
            },
            error: function () {
                alert("błąd połączenia");
            }
        });
    }

    render() {
        return (
            <BlogModel
                getTitle={this.getTitle}
                getContent={this.getContent}
                send={this.sendBlogToServer}
                createTime={this.state.createTime}
            />
            );
    }
    
}