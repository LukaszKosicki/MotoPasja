import React from "react";
import { connect } from "react-redux";
import { updateAvatar } from "../../../store/actions/loggedUser";
import MyAvatar from "../Avatar";
import { Alert } from "reactstrap";

class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewAvatar: false,
            isOpenChangeEmailAlert: false
        };
    }

    newAvatarForm = () => {
        this.setState({
            addNewAvatar: !this.state.addNewAvatar
        });
    }

    dismissAlert = () => {
        this.setState({
            isOpenChangeEmailAlert: !this.state.isOpenChangeEmailAlert
        });
    }

    deleteAvatar = () => {
        fetch("user/deleteAvatar", {
            method: "patch"
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.props.updateAvatar(res.avatar);
                    this.props.getUser();
                } else {
                    this.dismissAlert();
                }
            })
    }

    render() {
        var avatarDiv = {
            position: "relative",
            display: "inline-block"
        };
        var avatar = {
            maxWidth: "150px",
            maxHeight: "150px",
        };
        var input = {
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
        };
        var editIcon = {
            position: "absolute",
            right: "0px",
            bottom: "0px"
        };
        var deleteIcon = {
            position: "absolute",
            right: "0px",
            top: "0px"
        };
        return (
            <div className="avatar">
                <Alert className="my-alert" color="danger" isOpen={this.state.isOpenChangeEmailAlert} toggle={this.dismissAlert}>
                    Coś poszło nie tak. Odśwież stronę i spróbuj usunąć swój awatar jeszcze raz!!
                </Alert>
                <div style={avatarDiv}>
                    <img style={avatar} src={this.props.avatar} alt="Red dot" />
                    {
                     this.state.addNewAvatar &&  
                        <MyAvatar
                            getUser={this.props.getUser}
                            close={this.newAvatarForm}
                        />
                      
                    }
                    {this.props.userName === this.props.loggedUser &&
                        <div>
                            <button id="deleteAvatar" onClick={this.deleteAvatar} style={input}></button>
                        <label className="edit-avatar-icon" style={deleteIcon} htmlFor="deleteAvatar"><img src="/icons/deleteAvatar.png" /></label>
                        </div>
                    }
                    {this.props.userName === this.props.loggedUser &&
                        <div>
                            <button id="avatar" onClick={this.newAvatarForm} style={input}></button>
                        <label className="edit-avatar-icon" style={editIcon} htmlFor="avatar"><img src="/icons/editAvatar.png" /></label>
                        </div>
                    }
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.user.user.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAvatar: avatar => dispatch(updateAvatar(avatar))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);