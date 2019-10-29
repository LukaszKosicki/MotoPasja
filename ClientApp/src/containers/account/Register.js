import React from 'react';
import './FormStyles.css';
import { connect } from "react-redux";
import { cleanFields } from "../../store/actions/formFields/allFields";
import { checkUserNameForNullOrEmptyExpression } from "../../store/actions/formFields/userNameField";
import { checkEmailForEmailExpression } from "../../store/actions/formFields/emailField";
import { checkPasswordForPasswordExpression } from "../../store/actions/formFields/passwordField";
import { checkConfirmedPassword } from "../../store/actions/formFields/confirmedPasswordField";
import RegisterForm from "../../components/account/RegisterForm";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAlert: false,
            errorsList: []
        };
        this.props.resetForm();
    }

    dismissAlert = () => {
        this.setState({
            isOpenAlert: false
        });
    }

    register = () => {
        this.props.checkUserName(this.props.userName["value"]);
        this.props.checkEmail(this.props.email["value"]);
        this.props.checkPassword(this.props.password["value"]);
        this.props.checkConfirmedPassword(this.props.confirmedPassword["value"]);

        var registerModel = {
            userName: this.props.userName["value"],
            email: this.props.email["value"],
            password: this.props.password["value"],
            passwordRepeated: this.props.confirmedPassword["value"]
        };

        if (this.props.userName["valid"] && this.props.email["valid"] &&
            this.props.password["valid"] && this.props.confirmedPassword["valid"]) {
            fetch("account/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerModel)
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.success) {
                        this.props.history.push({
                            pathname: "/success",
                            state: { statement: resp.message }
                        })
                    } else {
                        this.setState({
                            errorsList: resp.errors
                        });
                    }
                })
                .catch(() => {
                    this.props.history.push("/error");
                });
        } else {
            this.setState({
                isOpenAlert: true
            });
        }
    }

    render() {
        return (
            <RegisterForm
                errorsList={this.state.errorsList}
                isOpenAlert={this.state.isOpenAlert}
                dismissAlert={this.dismissAlert}
                register={this.register}
                />
            );
    }
}

const mapStateToProps = state => ({
    userName: state.userNameField,
    email: state.emailField,
    password: state.passwordField,
    confirmedPassword: state.confirmedPasswordField
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(cleanFields()),
    checkUserName: userName => dispatch(checkUserNameForNullOrEmptyExpression(userName)),
    checkEmail: email => dispatch(checkEmailForEmailExpression(email)),
    checkPassword: password => dispatch(checkPasswordForPasswordExpression(password)),
    checkConfirmedPassword: confirmedPassword => dispatch(checkConfirmedPassword(confirmedPassword))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));