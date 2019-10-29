import React from "react";
import { connect } from "react-redux";
import { resetForm } from "../../store/actions/loginRegisterForm";
import SuccessfulPasswordChange from "../../components/account/SuccessfulPasswordChange";
import ChangePasswordForm from "../../components/account/ChangePasswordForm";
import { withRouter } from "react-router-dom";

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
                .catch(() => {
                    this.props.history.push("/error");
                });
        }
    }

    changeCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }

    render() {
        if (!this.state.passwordChange) {
            return (
                <ChangePasswordForm
                    errorsList={this.state.errorsList}
                    resetPassword={this.resetPassword}
                    />
            );
        } else {
            return (
                <SuccessfulPasswordChange />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));