import React from "react";
import { email } from "../../../js/RegularExpressions";
import MyFormGroup from "../presentational/MyFormGroup";
import { connect } from "react-redux";
import { setEmail } from "../../../store/actions/loginRegisterForm";

class EmailFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        };
        this.props.setEmail({
            value: this.props.defaultValue,
            valid: false,
            invalid: false,
            statement: ""
        });
    }

    componentDidMount() {
        console.log(this.state);
    }

    handleValue = (value) => {
        this.setState({
            value: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.check === false && this.props.check === true) ||
            (prevState.value !== this.state.value)) {
            if (email.test(this.state.value)) {
                this.props.setEmail({
                    value: this.state.value,
                    valid: true,
                    invalid: false,
                    statement: ""
                });
            } else {
                this.props.setEmail({
                    value: this.state.value,
                    valid: false,
                    invalid: true,
                    statement: "Wprowadź adres e-mail!"
                });
            }
            if (this.props.check) {
                this.props.changeCheck();
            }
        }       
    }
   
    render() {
        return (
            <MyFormGroup
                defaultValue={this.props.defaultValue}
                inputId="email"
                valid={this.props.email["valid"]}
                labelText="E-mail:"
                invalid={this.props.email["invalid"]}
                check={this.handleValue}
                inputType="email"
                inputName="email"
                statement={this.props.email["statement"]}
                />
            );
    }
}

const mapStateToProps = state => ({
    email: state.form.email
});

const mapDispatchToProps = dispatch => ({
    setEmail: email => dispatch(setEmail(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormGroup);