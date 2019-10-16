import React from "react";
import { withRouter } from "react-router-dom";
import UpdateUserData from "../container/UpdateUserData";
import { connect } from "react-redux";

class UserData extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        var p = {
            marginBottom: "0px"
        }
        if (!this.props.edit) {
            return (
                <div>
                    <p style={p}>Nazwa użytkownika: {this.props.userName}</p>
                    {this.props.loggedUserName === this.props.userName &&
                        <p style={p}>E-mail: {this.props.email}</p>
                    }
                </div>
            )
        } else {
            return (
                <UpdateUserData
                    email={this.props.email}
                    userName={this.props.userName}
                    editData={this.props.editData}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    loggedUserName: state.user.user.userName
});

export default withRouter(connect(mapStateToProps)(UserData));