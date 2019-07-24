import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 0,
            valid: this.props.valid,
            invalid: this.props.invalid
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.invalid !== prevProps.invalid) {
            this.setState({
                invalid: this.props.invalid
            });
        }
        if (this.props.valid !== prevProps.valid) {
            this.setState({
                valid: this.props.valid
            });
        }
    }

    componentDidMount() {
        if (this.props.value != undefined) {
            this.setState({
                length: this.props.value.length
            });
        }
    }

    count = (event) => {
        this.props.getText(event.target.value);
        const ln = event.target.value.length;
        this.setState({
            length: ln
        });
        if (!this.props.checkText(event.target.value)) {
            this.setState({
                valid: false,
                invalid: true
            });
        } else {
            this.setState({
                invalid: false,
                valid: true
            });
        }
    }

    render() {
        return (
            <FormGroup>
                <Label>{this.props.name}</Label>
                <Input onKeyUp={this.count} valid={this.state.valid} invalid={this.state.invalid} defaultValue={this.props.value} maxLength={this.props.maxLength} />
                <small>Pozostało: {this.props.maxLength - this.state.length} z 70 znaków</small>
            </FormGroup>
            );
    }
}