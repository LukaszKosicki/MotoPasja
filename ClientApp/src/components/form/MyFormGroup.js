import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const MyFormGroup = ({ inputId, valid, labelText, invalid, check, inputType, inputName, defaultValue, statement }) => (

    <FormGroup className="text-left">
        <Label for={inputId}>{labelText}</Label>
        <Input valid={valid} invalid={invalid} onChange={check} type={inputType} name={inputName} id={inputId} defaultValue={defaultValue} />
        <FormFeedback valid={valid}>{statement}</FormFeedback>
    </FormGroup>
);

export default MyFormGroup;