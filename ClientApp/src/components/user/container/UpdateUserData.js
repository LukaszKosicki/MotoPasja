import React from "react";
import { Form, FormGroup, Label, Input, Col, Row, Button, FormText, Alert } from "reactstrap";
import UserNameFormGroup from "../../account/container/UserNameFormGroup";
import EmailFormGroup from "../../account/container/EmailFormGroup";
import PasswordFormGroup from "../../account/container/PasswordFormGroup";
import { connect } from "react-redux";
import { resetForm } from "../../../store/actions/loginRegisterForm";
import { updateUserName } from "../../../store/actions/loggedUser";
import { email, nullOrEmpty } from "../../../js/RegularExpressions";
import { withRouter } from "react-router-dom";

class UpdateUserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterPasswordForm: false,
            isOpenChangeEmailAlert: false,
            check: false
        };
    }

    changeCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }

    sendForm = () => {
        console.log(this.props);
        var data = {
            userName: this.props.newUserName["value"],
            email: this.props.newEmail["value"],
            password: this.props.password["value"]
        };

        if (this.props.password["valid"] && this.props.password["value"] !== "") {
            fetch("user/updateUser", {
                method: "patch",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        if (res.userNameChanged) {
                            this.props.history.push("/myProfile/" + res.userName);
                            this.props.updateUserName(res.userName);
                        }
                        if (res.emailChanged) {
                            this.dismissAlert();
                        }
                        this.props.editData();
                    } else {
                        alert(res.errors);
                    }
                })
        }
        else {
            alert("Jeśli chcesz zmienić dane, wprowadź poprawnie hasło!");
        } 
    }

    dismissAlert = () => {
        this.setState({
            isOpenChangeEmailAlert: !this.state.isOpenChangeEmailAlert
        });
    }

    showHideEnterPasswordForm = () => {
        this.setState({
            enterPasswordForm: !this.state.enterPasswordForm
        })
    }

    updateUserData = () => {
        console.log(this.props);
        if ((this.props.userName !== this.props.newUserName["value"] ||
            this.props.email !== this.props.newEmail["value"]) && (email.test(this.props.newEmail["value"]))) {
            this.showHideEnterPasswordForm();
        } else {
            alert("Wprowadzone dane nie różnią się od aktualnych!");
        }
    }

    render() {
        var saveBtn = {
            margin: "auto",
            display: "block"
        };
        return (
            <Form>
                {!this.state.enterPasswordForm &&
                    <Row form>
                        <Alert color="info" isOpen={this.state.isOpenChangeEmailAlert} toggle={this.dismissAlert}>
                            Zmieniłeś też adres e-mail. Aby potwierdzić zmianę kliknij w link wysłany na nowy adres e-mail!
                        </Alert>
                        <Col md={6}>
                            <UserNameFormGroup
                            defaultValue={this.props.userName}
                            check={this.state.check}
                            changeCheck={this.changeCheck}
                            />
                        </Col>
                        <Col md={6}>
                            <EmailFormGroup
                            defaultValue={this.props.email}
                            check={this.state.check}
                            changeCheck={this.changeCheck}
                            />
                        </Col>
                        <Button onClick={this.updateUserData} style={saveBtn} color="primary" type="button">
                            Dalej</Button>
                    </Row>
                }
                {this.state.enterPasswordForm &&
                    <div>
                    <PasswordFormGroup />
                    <Button style={saveBtn} onClick={this.sendForm} type="button" color="primary">Zapisz zmiany</Button>
                    </div>
                }
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    newUserName: state.form.userName,
    newEmail: state.form.email,
    password: state.form.password
});

const mapDispatchToProps = dispatch => ({
    updateUserName: userData => dispatch(updateUserName(userData)),
    resetForm: () => dispatch(resetForm())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUserData));