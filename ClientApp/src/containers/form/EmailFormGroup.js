import React from "react";
import MyFormGroup from "../../components/form/MyFormGroup";
import { connect } from "react-redux";
import {
    setValue, fieldValid, fieldInvalid, setStatement, checkEmailForEmailExpression
} from "../../store/actions/formFields/emailField";

class EmailFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.props.setEmail(
            this.props.defaultValue !== undefined ?
                this.props.defaultValue : "");
    }

    handleValue = (e) => {
        this.props.setEmail(e.target.value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.email["value"] !== this.props.email["value"]) {
            this.props.checkEmail(this.props.email["value"]);
        }       
    }
   
    render() {
        return (
            <MyFormGroup
                defaultValue={this.props.defaultValue}
                inputId="email"
                valid={this.props.email["valid"]}
                labelText="E-mail:"
                invalid={this.props.email["invalid"]}
                check={this.handleValue}
                inputType="email"
                inputName="email"
                statement={this.props.email["statement"]}
                />
            );
    }
}

const mapStateToProps = state => ({
    email: state.emailField
});

const mapDispatchToProps = dispatch => ({
    setEmail: email => dispatch(setValue(email)),
    fieldValid: () => dispatch(fieldValid()),
    fieldInvalid: () => dispatch(fieldInvalid()),
    setStatement: statement => dispatch(setStatement(statement)),
    checkEmail: email => dispatch(checkEmailForEmailExpression(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormGroup);