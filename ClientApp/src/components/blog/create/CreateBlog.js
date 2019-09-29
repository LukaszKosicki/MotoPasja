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
        var fullTime = time.getFullYear() + '-' + (time.getMonth() < 10 ? '0' : '') + time.getMonth()
            + '-' + (time.getDay() < 10 ? '0' : '') + time.getDay() + ' '
            + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '')
            + time.getMinutes() + ':' + (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
        console.log(fullTime);
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

        fetch("blog/createBlog", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
            .then(resp => resp.json())
            .then(blog => this.redirectToBlog(blog))
            .catch(function () { alert("błąd połączenia") });
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