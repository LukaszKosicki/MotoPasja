import React from 'react';
import { Button, Form, Alert } from 'reactstrap';
import ConfirmedPasswordFormGroup from "../account/container/ConfirmedPasswordFormGroup";
import EmailFormGroup from "../account/container/EmailFormGroup";
import PasswordFormGroup from "../account/container/PasswordFormGroup";
import UserNameFormGroup from "../account/container/UserNameFormGroup";
import './FormStyles.css';
import { connect } from "react-redux";
import { resetForm } from "../../store/actions/loginRegisterForm";
import MyAlert from "../common/MyAlert";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            isOpenAlert: false,
            errorsList: [],
            isOpenAlertFromServer: false
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
        });
    }
 
    register = () => {
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
        } else {
            this.changeCheck();
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
        return (
            <div>
                <MyAlert
                    errorsList={this.state.errorsList}
                    />
                <Alert color="danger" isOpen={this.state.isOpenAlert} toggle={this.dismissAlert}>
                    Żeby się zarejestrować uzupełnij poprawnie formularz!
                </Alert>
               
                <div style={parentDiv}>
                    <div className="loginForm" style={childDiv}>
                        <Form>
                            <div style={parentDiv}>
                                <h4>Rejestracja</h4>
                                <hr />
                            </div>
                            <UserNameFormGroup
                                changeCheck={this.changeCheck}
                                check={this.state.check}
                            />
                            <EmailFormGroup
                                changeCheck={this.changeCheck}
                                check={this.state.check}
                            />
                            <PasswordFormGroup
                                changeCheck={this.changeCheck}
                                check={this.state.check}
                                formName="registration"
                            />
                            <ConfirmedPasswordFormGroup
                                changeCheck={this.changeCheck}
                                check={this.state.check}
                            />
                            <div style={parentDiv}>
                                <Button onClick={this.register} type="button" color="primary">Zarejestruj się</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => ({
    userName: state.form.userName,
    email: state.form.email,
    password: state.form.password,
    confirmedPassword: state.form.confirmedPassword
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(resetForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);