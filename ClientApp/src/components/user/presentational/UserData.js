import React from "react";
import { withRouter } from "react-router-dom";
import UpdateUserData from "../container/UpdateUserData";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenChangeEmailAlert: false
        };
    }

    dismissAlert = () => {
        this.setState({
            isOpenChangeEmailAlert: !this.state.isOpenChangeEmailAlert
        });
    }

    render() {
        var p = {
            marginBottom: "0px"
        };
        if (!this.props.edit) {
            return (
                <div>
                    <Alert className="my-alert" color="info" isOpen={this.state.isOpenChangeEmailAlert} toggle={this.dismissAlert}>
                        Zmieniłeś adres e-mail. Aby potwierdzić zmianę kliknij w link wysłany na nowy adres e-mail!
                    </Alert>
                    <div>
                        <p style={p}>Nazwa użytkownika: {this.props.userName}</p>
                        {this.props.loggedUserName === this.props.userName &&
                            <p style={p}>E-mail: {this.props.email}</p>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <UpdateUserData
                    email={this.props.email}
                    userName={this.props.userName}
                    editData={this.props.editData}
                    dismissAlert={this.dismissAlert}
                    getUser={this.props.getUser}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    loggedUserName: state.user.user.userName
});

export default withRouter(connect(mapStateToProps)(UserData));