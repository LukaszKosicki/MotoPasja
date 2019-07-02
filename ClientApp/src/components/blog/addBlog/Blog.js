import React from 'react';
import { Button, Form } from 'reactstrap';
import TextInput from '../../common/textInput/textInput';
import TextareaInput from '../../common/textInput/textareaInput';
import ImageBox from "../../common/imageBox/imageBox";
import $ from 'jquery';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        
        this.sendBlogToServer = this.sendBlogToServer.bind(this);
    }

    sendBlogToServer() {
        var blog = {
            title: $('#blogTitle').val(),
            contents: $('#blogContents').val()
        };

        $.ajax({
            url: "blog/addBlog",
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(blog)
        });
    }

    render() {
        var formStyles = {
            textAlign: 'left'
        };
        var divStyles = {
            textAlign: 'center'
        };
        var imagesBox = [];
        for (var i = 0; i < 8; i++) {
            imagesBox.push(<ImageBox
                key={'blogImage' + i}
                fullTime={this.props.fullTime}
                id={"img" + i}
            />);
        }

        return (
            <div>
                <Form style={formStyles}>
                    <TextInput 
                        inputId="blogTitle"
                        maxLength="70"
                    />
                    <TextareaInput 
                        inputId="blogContents"
                    />
                    <div style={divStyles}>
                        {imagesBox}
                        <div>
                            <Button type="button" onClick={this.sendBlogToServer} color="primary">Zapisz blog</Button>
                        </div>
                    </div>
                </Form>        
            </div>
            );
    }
}