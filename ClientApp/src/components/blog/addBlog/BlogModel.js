import React, { Component } from 'react';
import TextInput from '../../common/textInput/textInput';
import TextareaInput from '../../common/textInput/textareaInput';
import ImageBox from "../../common/images/imageBox";
import { Button, Form } from 'reactstrap';

export default class BlogModel extends Component {
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
                key={this.props.createTime + i}
                createTime={this.props.createTime}
                id={'img' + i}
            />);
        }

        return (
            <div>
                <Form style={formStyles}>
                    <TextInput
                        maxLength="70"
                        getText={this.props.getTitle}
                        name="Tytuł:"
                    />
                    <TextareaInput
                        getText={this.props.getContent}
                        name="Treść blogu:"
                    />
                    <div style={divStyles}>
                        {imagesBox}
                        <div>
                            <Button type="button" onClick={this.props.send} color="primary">Zapisz blog</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}