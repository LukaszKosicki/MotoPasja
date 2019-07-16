import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class TextareaInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 0
        };
    }

    count = (event) => {
        this.props.getText(event.target.value);
        const ln = event.target.value.length;
        this.setState({
            length: ln
        });
    }

    render() {
        return (
            <FormGroup>
                <Label>{this.props.name}</Label>
                <Input onKeyUp={this.count} type="textarea"/>
                <small>Ilość znaków: {this.state.length}</small>
            </FormGroup>
            );
    }
}