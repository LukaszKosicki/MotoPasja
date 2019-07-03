import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class TextareaInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 0
        };

        this.count = this.count.bind(this);
    }

    count = event => {
        this.props.getText(event.target.value);
        const ln = event.target.value.length;
        this.setState({
            length: ln
        });
    }

    render() {
        return (
            <FormGroup>
                <Label for={this.props.inputId}>Opis blogu</Label>
                <Input onKeyUp={this.count} type="textarea" id={this.props.inputId} />
                <small>Ilość znaków: {this.state.length}</small>
            </FormGroup>
            );
    }
}