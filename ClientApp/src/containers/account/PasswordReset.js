import React from "react";
import PasswordRecovery from "../../components/account/PasswordRecovery";
import { cleanFields } from "../../store/actions/formFields/allFields";
import { connect } from "react-redux";
import { checkEmailForEmailExpression } from "../../store/actions/formFields/emailField";
import EmailSent from "../../components/account/EmailSent_PasswordReset";
import { withRouter } from "react-router-dom";

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: false,
            errorsList: [],
            isOpenAlert: false
        };
        this.props.resetForm();
    }

    dismissAlert = () => {
        this.setState({
            isOpenAlert: false
        });
    }

    generateEmail = () => {
        this.props.checkEmail(this.props.email["value"]);

        if (this.props.email["valid"]) {
            fetch("account/resetPasswordGenerateToken/?email=" + this.props.email["value"])
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.success) {
                        this.setState({
                            emailSent: true
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
        } else {
            this.setState({
                isOpenAlert: true
            });
        }
    }

    render() {
        if (!this.state.emailSent) {
            return (
                <PasswordRecovery
                    generateEmail={this.generateEmail}
                    cancel={this.props.cancel}
                    isOpenAlert={this.state.isOpenAlert}
                    dismissAlert={this.dismissAlert}
                    errorsList={this.state.errorsList}
                    />
            );
        } else {
            return (
                <EmailSent />
                );
        }
    }
}

const mapStateToProps = state => ({
    email: state.emailField
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(cleanFields()),
    checkEmail: email => dispatch(checkEmailForEmailExpression(email))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset));