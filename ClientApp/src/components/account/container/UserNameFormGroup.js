import React from "react";
import { nullOrEmpty } from "../../../js/RegularExpressions";
import MyFormGroup from "../presentational/MyFormGroup";
import { connect } from "react-redux";
import { setUserName } from "../../../store/actions/loginRegisterForm";

class UserNameFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.props.setUserName({
            value: this.props.defaultValue,
            valid: false,
            invalid: false,
            statement: ""
        });
    }

    handleValue = (value) => {
        this.setState({
            value: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.check === false && this.props.check === true) ||
            (prevState.value !== this.state.value)) {
            if (nullOrEmpty.test(this.state.value)) {
                this.props.setUserName({
                    value: this.state.value,
                    valid: true,
                    invalid: false,
                    statement: ""
                });
            } else {
                this.props.setUserName({
                    value: this.state.value,
                    valid: false,
                    invalid: true,
                    statement: "Wprowadź nazwę użytkownika!"
                });
            }
        }
    }

    render() {
        return (
            <MyFormGroup
                inputId="userName"
                defaultValue={this.props.defaultValue}
                valid={this.props.userName["valid"]}
                labelText="Nazwa użytkownika:"
                invalid={this.props.userName["invalid"]}
                check={this.handleValue}
                inputType="text"
                inputName="userName"
                statement={this.props.userName["statement"]}
                />
            );
    }
}

const mapStateToProps = state => ({
    userName: state.form.userName
});

const mapDispatchToProps = dispatch => ({
    setUserName: userName => dispatch(setUserName(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNameFormGroup);