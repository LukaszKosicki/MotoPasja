import React from "react";
import MyFormGroup from "../../components/form/MyFormGroup";
import { connect } from "react-redux";
import {
    setValue, fieldValid, fieldInvalid, setStatement, checkPasswordForPasswordExpression, checkPasswordForNullOrEmptyExpression
} from "../../store/actions/formFields/passwordField";

class PasswordFormGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    handleValue = (e) => {
       this.props.setPassword(e.target.value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.password["value"] !== this.props.password["value"]) {
            if (this.props.formName === "registration") {
                this.props.checkPasswordForEmailExpression(this.props.password["value"]);
            } else {
                this.props.checkPasswordForNullOrEmptyExpression(this.props.password["value"]);
            }
        }
    }

    render() {
        return (
            <MyFormGroup
                inputId="password"
                valid={this.props.password["valid"]}
                labelText="Hasło:"
                invalid={this.props.password["invalid"]}
                check={this.handleValue}
                inputType="password"
                inputName="password"
                statement={this.props.password["statement"]}
            />
        );
    }
}

const mapStateToProps = state => ({
    password: state.passwordField
});

const mapDispatchToProps = dispatch => ({
    setPassword: password => dispatch(setValue(password)),
    fieldValid: () => dispatch(fieldValid()),
    fieldInvalid: () => dispatch(fieldInvalid()),
    setStatement: statement => dispatch(setStatement(statement)),
    checkPasswordForEmailExpression: password => dispatch(checkPasswordForPasswordExpression(password)),
    checkPasswordForNullOrEmptyExpression: password => dispatch(checkPasswordForNullOrEmptyExpression(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordFormGroup);