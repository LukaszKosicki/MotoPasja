import React from 'react';
import LoginForm from "../../components/account/LoginForm";
import './FormStyles.css';
import { connect } from 'react-redux';
import { isLogged } from "../../store/actions/loggedUser";
import { withRouter } from "react-router-dom";
import { cleanFields } from "../../store/actions/formFields/allFields";
import PasswordReset from "./PasswordReset";
import { checkEmailForEmailExpression } from "../../store/actions/formFields/emailField";
import { checkPasswordForNullOrEmptyExpression } from "../../store/actions/formFields/passwordField";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAlert: false,
            errorsList: [],
            forgotPassword: false
        };
        this.props.resetForm();
    }

    dismissAlert = () => {
        this.setState({
            isOpenAlert: false
        });
    }

    forgotPasswordForm = () => {
        this.setState({
            forgotPassword: !this.state.forgotPassword
        });
    }

    login = () => {
        this.props.checkEmail(this.props.email["value"]);
        this.props.checkPassword(this.props.password["value"]);

        var loginModel = {
            email: this.props.email["value"],
            password: this.props.password["value"]
        };

        if (this.props.email["valid"] === true && this.props.password["valid"] === true) {
            fetch("account/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginModel)
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.success) {
                        this.props.isLogged(resp);
                        if (this.props.history.location.pathname == "/login") {
                            this.props.history.push("/");
                        }
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
        if (!this.state.forgotPassword) {
            return (
                <LoginForm
                    errorsList={this.state.errorsList}
                    isOpenAlert={this.state.isOpenAlert}
                    dismissAlert={this.dismissAlert} 
                    login={this.login}
                    forgotPasswordForm={this.forgotPasswordForm}
                    />
            );
        } else {
            return (
                <PasswordReset
                    cancel={this.forgotPasswordForm}
                />
                );
        }
    }
}

const mapStateToProps = state => ({
    email: state.emailField,
    password: state.passwordField
});

const mapDispatchToProps = dispatch => {
    return {
        isLogged: user => dispatch(isLogged(user)),
        resetForm: () => dispatch(cleanFields()),
        checkEmail: email => dispatch(checkEmailForEmailExpression(email)),
        checkPassword: password => dispatch(checkPasswordForNullOrEmptyExpression(password))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

