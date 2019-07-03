import React from 'react';
import { Button, Form } from 'reactstrap';
import TextInput from '../../common/textInput/textInput';
import TextareaInput from '../../common/textInput/textareaInput';
import ImageBox from "../../common/imageBox/imageBox";
import $ from 'jquery';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            contents: ""
        };
        this.sendBlogToServer = this.sendBlogToServer.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getContent = this.getContent.bind(this);
        this.checkForm = this.checkForm.bind(this);
    }

    getTitle(text) {
        this.setState({
            title: text
        });
    }

    getContent(text) {
        this.setState({
            contents: text
        });
    }

    checkForm() {
        if (this.state.title && this.state.contents) {
            this.sendBlogToServer();
        } else {
            alert("pusty");
        }
    }

    sendBlogToServer() {
        var blog = {
            title: this.state.title,
            contents: this.state.contents,
            dateOfAddition: this.props.fullTime
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
        var formStyles = {
            textAlign: 'left'
        };
        var spanStyles = {
            marginLeft: '5px',
            marginRight: '5px'
        };
        var divStyles = {
            textAlign: 'center'
        };
        var imagesBox = [];
        for (var i = 0; i < 8; i++) {
            imagesBox.push(<ImageBox
                key={'blogImage' + i}
                fullTime={this.props.fullTime}
                id={"imgBlog" + i}
            />);
        }

        return (
            <div>
                <Form style={formStyles}>
                    <TextInput 
                        inputId="blogTitle"
                        maxLength="70"
                        getText={this.getTitle}
                    />
                    <TextareaInput 
                        inputId="blogContents"
                        getText={this.getContent}
                    />
                    <div style={divStyles}>
                        {imagesBox}
                        <div>
                            <Button type="button" onClick={this.checkForm} color="primary">Dodaj post</Button>
                            <span style={spanStyles}>lub</span>
                            <Button type="button" onClick={this.checkForm} color="primary">Zapisz blog</Button>
                        </div>
                    </div>
                </Form>        
            </div>
            );
    }
}