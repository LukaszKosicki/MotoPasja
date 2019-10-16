import React from "react";
import { nullOrEmpty, password } from "../../../js/RegularExpressions";
import MyFormGroup from "../presentational/MyFormGroup";
import { connect } from "react-redux";
import { setPassword } from "../../../store/actions/loginRegisterForm";

class PasswordFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleValue = (value) => {
        this.setState({
            value: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
        if ((prevProps.check === false && this.props.check === true) ||
            (prevState.value !== this.state.value)) {
            if (this.props.formName === "registration") {
                if (password.test(this.state.value)) {
                    this.props.setPassword({
                        value: this.state.value,
                        valid: true,
                        invalid: false,
                        statement: ""
                    });
                } else {
                    this.props.setPassword({
                        value: this.state.value,
                        valid: false,
                        invalid: true,
                        statement: "Hasło musi składać się z minimum 8 znaków. Musi zawierać jedną małą i jedną dużą literę, liczbę oraz znak specjalny!"
                    });
                }
            } else {
                if (nullOrEmpty.test(this.state.value)) {
                    this.props.setPassword({
                        value: this.state.value,
                        valid: true,
                        invalid: false,
                        statement: ""
                    });
                } else {
                    this.props.setPassword({
                        value: this.state.value,
                        valid: false,
                        invalid: true,
                        statement: "Wprowadź hasło!"
                    });
                }
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
    password: state.form.password
});

const mapDispatchToProps = dispatch => ({
    setPassword: password => dispatch(setPassword(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordFormGroup);