import React from "react";
import MyFormGroup from "../presentational/MyFormGroup";
import { connect } from "react-redux";
import { setConfirmedPassword } from "../../../store/actions/loginRegisterForm";
import { nullOrEmpty } from "../../../js/RegularExpressions";

class ConfirmedPasswordFormGroup extends React.Component {
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
        console.log(this.props.confirmedPassword);
        console.log(this.state.value);
        if ((prevProps.check === false && this.props.check === true) ||
            (prevState.value !== this.state.value)) {
            if (this.props.password["value"] === this.state.value &&
                nullOrEmpty.test(this.state.value)) {
                this.props.setConfirmedPassword({
                    value: this.state.value,
                    valid: true,
                    invalid: false,
                    statement: ""
                });
            } else {
                this.props.setConfirmedPassword({
                    value: this.state.value,
                    valid: false,
                    invalid: true,
                    statement: "Wpisane hasła muszą być takie same!"
                });
            }
        }
    }

    render() {
        return (
            <MyFormGroup
                inputId="confirmedPassword"
                valid={this.props.confirmedPassword["valid"]}
                labelText="Powtórz hasło:"
                invalid={this.props.confirmedPassword["invalid"]}
                check={this.handleValue}
                inputType="password"
                inputName="confirmedPassword"
                statement={this.props.confirmedPassword["statement"]}
            />
        );
    }
}

const mapStateToProps = state => ({
    password: state.form.password,
    confirmedPassword: state.form.confirmedPassword
});

const mapDispatchToProps = dispatch => ({
    setConfirmedPassword: confirmedPassword => dispatch(setConfirmedPassword(confirmedPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedPasswordFormGroup);