import React from 'react';
import BlogModel from './BlogModel';
import $ from 'jquery';
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import Login from "../../account/Login";

class CreateBlog extends React.Component {
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
            headers: { "Authorization": "Bearer " + localStorage.getItem("motoPasjaToken") },
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
        if (this.props.isOnline) {
            return (
                <div>
                    <h1>Nowy blog</h1>
                    <BlogModel
                        send={this.sendBlogToServer}
                        anuluj={this.redirectToBlogsList}
                        modelId={this.state.createTime}
                        model={'blog'}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <Alert color="warning">
                        Dodać blog mogą tylko zalogowani użytkownicy!
                    </Alert>
                    <Login />
                </div>
                );
        }
    }   
}

const mapStateToProps = state => ({
    isOnline: state.user.isOnline
});

export default connect(mapStateToProps)(CreateBlog);