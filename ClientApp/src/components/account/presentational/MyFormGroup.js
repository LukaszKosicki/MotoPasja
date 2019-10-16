import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

export default function MyFormGroup(props) {
    function handle(e) {
        props.check(e.target.value);
    }

    return (
        <FormGroup>
            <Label for={props.inputId}>{props.labelText}</Label>
            <Input valid={props.valid} invalid={props.invalid} onChange={handle} type={props.inputType} name={props.inputName} id={props.inputId} defaultValue={props.defaultValue} />
            <FormFeedback valid={props.valid}>{props.statement}</FormFeedback>
        </FormGroup>
        );
}