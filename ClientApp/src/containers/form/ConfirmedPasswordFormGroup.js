import React from "react";
import MyFormGroup from "../../components/form/MyFormGroup";
import { connect } from "react-redux";
import {
    setValue, fieldValid, fieldInvalid, setStatement, checkConfirmedPassword
} from "../../store/actions/formFields/confirmedPasswordField";

class ConfirmedPasswordFormGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    handleValue = (e) => {
        this.props.setConfirmedPassword(e.target.value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.confirmedPassword["value"] !== this.props.confirmedPassword["value"]) {
            this.props.checkConfirmedPassword(this.props.password["value"], this.props.confirmedPassword["value"]);
        }
    }

    render() {
        return (
            <MyFormGroup
                inputId="confirmedPassword"
                valid={this.props.confirmedPassword["valid"]}
                labelText="Powtórz hasło:"
                invalid={this.props.confirmedPassword["invalid"]}
                check={this.handleValue}
                inputType="password"
                inputName="confirmedPassword"
                statement={this.props.confirmedPassword["statement"]}
            />
        );
    }
}

const mapStateToProps = state => ({
    password: state.passwordField,
    confirmedPassword: state.confirmedPasswordField
});

const mapDispatchToProps = dispatch => ({
    setConfirmedPassword: password => dispatch(setValue(password)),
    fieldValid: () => dispatch(fieldValid()),
    fieldInvalid: () => dispatch(fieldInvalid()),
    setStatement: statement => dispatch(setStatement(statement)),
    checkConfirmedPassword: ( password, confirmedPassword ) => dispatch(checkConfirmedPassword(password, confirmedPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedPasswordFormGroup);