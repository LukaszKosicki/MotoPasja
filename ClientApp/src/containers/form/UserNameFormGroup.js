import React from "react";
import MyFormGroup from "../../components/form/MyFormGroup";
import { connect } from "react-redux";
import {
    setValue, fieldValid, fieldInvalid, setStatement, checkUserNameForNullOrEmptyExpression
} from "../../store/actions/formFields/userNameField";

class UserNameFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.props.setUserName(
            this.props.defaultValue !== undefined ?
                this.props.defaultValue : "");
    }

    handleValue = (e) => {
        this.props.setUserName(e.target.value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userName["value"] !== this.props.userName["value"]) {
            this.props.checkUserNameForNullOrEmptyExpression(this.props.userName["value"]);
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
    userName: state.userNameField
});

const mapDispatchToProps = dispatch => ({
    setUserName: userName => dispatch(setValue(userName)),
    fieldValid: () => dispatch(fieldValid()),
    fieldInvalid: () => dispatch(fieldInvalid()),
    setStatement: statement => dispatch(setStatement(statement)),
    checkUserNameForNullOrEmptyExpression: userName => dispatch(checkUserNameForNullOrEmptyExpression(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNameFormGroup);