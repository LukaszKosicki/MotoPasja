import React from "react";
import PasswordFormGroup from "../account/container/PasswordFormGroup";
import ConfirmedPasswordFormGroup from "../account/container/ConfirmedPasswordFormGroup";
import { connect } from "react-redux";
import { resetForm } from "../../store/actions/loginRegisterForm";
import { Button } from "reactstrap";
import SuccessfulPasswordChange from "../account/SuccessfulPasswordChange";
import MyAlert from "../common/MyAlert";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            userId: "",
            token: "",
            passwordChange: false,
            errorsList: []
        };
        this.props.resetForm();
    }

    componentDidMount() {
        const params = this.props.location.search.split('&');
        this.setState({
            userId: params[0].split('=')[1],
            token: params[1].split('=')[1]
        });
    }

    resetPassword = () => {
        if (this.props.password["valid"] && this.props.confirmedPassword["valid"]) {
            var formData = new FormData();
            console.log(this.state.token);
            formData.append("password", this.props.password["value"]);
            formData.append("confirmedPassword", this.props.password["value"]);
            formData.append("userId", this.state.userId);
            formData.append("token", this.state.token);

            fetch("account/resetPassword", {
                method: "post",
                body: formData
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.success) {
                        this.setState({
                            passwordChange: true
                        });
                    } else {
                        this.setState({
                            errorsList: resp.errors
                        });
                    }
                })
        }
    }

    changeCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }

    render() {
        var center = {
            textAlign: "center"
        };
        var successfulDiv = {
            position: "absolute",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            top: "0",
            left: "0"
        };
        if (!this.state.passwordChange) {
            return (
                <div>
                    <MyAlert
                        errorsList={this.state.errorsList}
                        />
                    <div style={center}>
                        <h4>Reset hasła</h4>
                        <hr />
                    </div>
                    <PasswordFormGroup
                        check={this.state.check}
                        changeCheck={this.changeCheck}
                    />
                    <ConfirmedPasswordFormGroup
                        check={this.state.check}
                        changeCheck={this.changeCheck}
                    />
                    <div style={center}>
                        <Button onClick={this.resetPassword} color="primary" type="button">Wyślij</Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={successfulDiv}>
                    <SuccessfulPasswordChange />
                </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    password: state.form.password,
    confirmedPassword: state.form.confirmedPassword
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(resetForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);