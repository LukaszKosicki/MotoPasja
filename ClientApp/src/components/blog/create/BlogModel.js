import React, { Component } from 'react';
import TextInput from '../../common/textInput/textInput';
import TextareaInput from '../../common/textInput/textareaInput';
import ImageBox from "../../common/images/imageBox";
import { Button, Form, FormText } from 'reactstrap';

export default class BlogModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validTitle: false,
            invalidTitle: false,
            validContents: false,
            invalidContents: false,
            contents: this.props.content,
            title: this.props.title
        };
    }

    checkText = (text) => {
        if (text != null && text != "") {
            for (let chr of text) {
                if (chr != " " && chr != '/r') {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    getContent = (text) => {
        this.setState({
            contents: text
        });
    }

    getTitle = (text) => {
        this.setState({
            title: text
        });
    }

    send = () => {
        if (this.checkText(this.state.title) && this.checkText(this.state.contents)) {
            this.props.send(this.state.title, this.state.contents);
        } else {
            if (!this.checkText(this.state.title)) {
                this.setState({
                    invalidTitle: true,
                    validTitle: false
                });
            } else {
                this.setState({
                    invalidTitle: false,
                    validTitle: true
                });
            }
            if (!this.checkText(this.state.contents)) {
                this.setState({
                    invalidContents: true,
                    validContents: false
                });
            } else {
                this.setState({
                    invalidContents: false,
                    validContents: true
                });
            }
        }
    }

    render() {
        var formStyles = {
            textAlign: 'left'
        };
        var divStyles = {
            textAlign: 'center'
        };
        var buttonsStyles = {
            margin: '5px'
        };
        var imagesBox = [];
        for (var i = 0; i < 8; i++) {
            var isImg = false;
            if (this.props.images != undefined) {
                this.props.images.forEach((item, index, arr) => {
                    if (item.fileName.indexOf('img' + i) != -1) {
                        imagesBox.push(<ImageBox
                            key={this.props.modelId + i}
                            id={this.props.modelId + i}
                            fileName={"img" + i}
                            modelId={this.props.modelId}
                            path={item.fileName}
                            getBlog={this.props.getBlog}
                            model={this.props.model}
                        />);
                        isImg = true;
                    }
                });
            }
            if (!isImg) {
                imagesBox.push(<ImageBox
                    key={this.props.modelId + i}
                    modelId={this.props.modelId}
                    id={this.props.modelId + i}
                    fileName={"img" + i}
                    getBlog={this.props.getBlog}
                    model={this.props.model}
                />);
            }
        }

        return (
            <div>
                <Form style={formStyles}>
                    <TextInput
                        maxLength="70"
                        getText={this.getTitle}
                        name="Tytuł:"
                        value={this.props.title}
                        checkText={this.checkText}
                        valid={this.state.validTitle}
                        invalid={this.state.invalidTitle}
                    />
                    <TextareaInput
                        getText={this.getContent}
                        name="Treść blogu:"
                        value={this.props.content}
                        checkText={this.checkText}
                        valid={this.state.validContents}
                        invalid={this.state.invalidContents}
                    />
                    <div style={divStyles}>
                        {imagesBox}        
                        {
                            this.props.edit && <FormText>(Zmiany w zdjęciach zostają zapisane automatycznie)</FormText>
                        }
                        <div>
                            <Button style={buttonsStyles} type="button" onClick={this.send} color="primary">Zapisz</Button>
                            <Button style={buttonsStyles} type="button" onClick={this.props.anuluj} color="danger">Anuluj</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}