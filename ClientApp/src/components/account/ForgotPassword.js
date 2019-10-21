import React from "react";
import EmailFormGroup from "../account/container/EmailFormGroup";
import { Button } from "reactstrap";
import { resetForm } from "../../store/actions/loginRegisterForm";
import { connect } from "react-redux";
import MyAlert from "../common/MyAlert";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            emailSent: false,
            errorsList: []
        };
        this.props.resetForm();
    }

    changeCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }

    generateEmail = () => {
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
    }

    render() {
        var btnStyles = {
            width: "50%"
        };
        var formStyles = {
            width: "100%"
        };
        if (!this.state.emailSent) {
            return (
                <div className="conteredContent">
                    <div style={formStyles}>
                        <div className="centerText">
                            <h4>Odzywkiwanie hasła</h4>
                            <hr />
                        </div>
                        <EmailFormGroup
                            check={this.state.check}
                            changeCheck={this.changeCheck}
                        />
                        <div>
                            <Button style={btnStyles} onClick={this.generateEmail} type="button" color="primary">
                                Zresetuj hasło</Button>
                            <Button outline style={btnStyles} onClick={this.props.cancel} type="button" color="danger">
                                Anuluj</Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="conteredContent">
                    <div>
                        <h4>Pierwszy etap za Tobą!</h4>
                        <hr />
                        <p>Na podany przez Ciebie adres e-mail został wysłany link, po którego kliknięciu zostaniesz
                            przekierowany na naszą stronę, na której będzie formularz do wpisania nowego hasła.</p>
                        <p>Powodzenia!!!</p>
                    </div>
                </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    email: state.form.email
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(resetForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);