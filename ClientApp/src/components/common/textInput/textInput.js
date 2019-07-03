import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default class TextInput extends React.Component {
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
                <Label for={this.props.inputId}>Tytuł:</Label>
                <Input onKeyUp={this.count} maxLength={this.props.maxLength} id={this.props.inputId} />
                <small>Pozostało: {this.props.maxLength - this.state.length} z 70 znaków</small>
            </FormGroup>
            );
    }
}