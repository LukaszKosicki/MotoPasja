import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { updateAvatar } from "../../../store/actions/loggedUser";

class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    sendAvatar = (e) => {
        var formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        fetch("User/UpdateAvatar", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(res => {
                this.props.getUser();
                this.props.updateAvatar(res);
            });
    }
    
    render() {
        var mainComponentDiv = {
            textAlign: "left"
        };
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
        return (
            <div style={mainComponentDiv}>
                <div style={avatarDiv}>
                    <img style={avatar} src={this.props.avatar} alt="Red dot" />
                    {this.props.userName === this.props.loggedUser &&
                        <div>
                        <input id="avatar" onChange={this.sendAvatar} style={input} type="file" />
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