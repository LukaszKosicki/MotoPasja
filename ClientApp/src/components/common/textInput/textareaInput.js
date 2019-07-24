import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class TextareaInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 0,
            invalid: false,
            valid: false
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
            console.log(this.state.valid);
            console.log(this.state.invalid);
        } else {
            this.setState({
                invalid: false,
                valid: true
            });
            console.log(this.state.valid);
            console.log(this.state.invalid);
        }     
    }

    render() {
        return (
            <FormGroup>
                <Label>{this.props.name}</Label>
                <Input invalid={this.state.invalid} valid={this.state.valid} onKeyUp={this.count} defaultValue={this.props.value} type="textarea" />
                <small>Ilość znaków: {this.state.length}</small>
            </FormGroup>
            );
    }
}