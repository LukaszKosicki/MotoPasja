import React from 'react';
import { Button, Form, Alert, } from 'reactstrap';
import './FormStyles.css';
import { connect } from 'react-redux';
import { isLogged } from "../../store/actions/loggedUser";
import { withRouter } from "react-router-dom";
import EmailFormGroup from "./container/EmailFormGroup";
import PasswordFormGroup from "./container/PasswordFormGroup";
import { resetForm } from "../../store/actions/loginRegisterForm";
import MyAlert from "../common/MyAlert";
import ForgotPassword from "../account/ForgotPassword";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
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

    changeCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }

    forgotPasswordForm = () => {
        this.setState({
            forgotPassword: !this.state.forgotPassword
        });
    }

    login = () => {
        this.changeCheck();
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
        } else {
            this.setState({
                isOpenAlert: true
            });
        }
    }

    render() {
        var parentDiv = {
            textAlign: 'center'
        };
        var childDiv = {
            textAlign: 'left',
            display: 'inline-block',
            margin: '0px'
        };
        if (!this.state.forgotPassword) {
            return (
                <div style={parentDiv}>
                    <div className="my-alert">
                        <MyAlert
                            errorsList={this.state.errorsList}
                        />
                        <Alert color="danger" isOpen={this.state.isOpenAlert} toggle={this.dismissAlert}>
                            Żeby się zalogować uzupełnij poprawnie formularz!
                        </Alert>
                    </div>
                    <div className="conteredContent">
                        <div className="loginForm" style={childDiv}>
                            <Form>
                                <div style={parentDiv}>
                                    <h4>Logowanie</h4>
                                    <hr />
                                </div>
                                <EmailFormGroup
                                    changeCheck={this.changeCheck}
                                    check={this.state.check}
                                />
                                <PasswordFormGroup
                                    changeCheck={this.changeCheck}
                                    formName="login"
                                    check={this.state.check}
                                />
                                <div style={parentDiv}>
                                    <Button type="button" onClick={this.login} color="primary">Zaloguj</Button>
                                    <Button type="button" color="link" onClick={this.forgotPasswordForm}>Nie pamiętam hasła</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={parentDiv}>
                    <div className="loginForm" style={childDiv}>
                        <ForgotPassword
                            cancel={this.forgotPasswordForm}
                        />
                    </div>
                </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    email: state.form.email,
    password: state.form.password
});

const mapDispatchToProps = dispatch => {
    return {
        isLogged: (user) => dispatch(isLogged(user)),
        resetForm: () => dispatch(resetForm())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

