import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { updateAvatar } from "../../../store/actions/user";

class UserCard extends React.Component {
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
            .then(res => this.props.updateAvatar(res)
            );
    }

    render() {
        var card = {
            border: "solid 1px black",
            display: "inline-block"
        };

        var avatarDiv = {
            width: "150px",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            position: "relative"
        };
        var avatar = {
            width: "150px",
            height: "150px",
            borderRadius: "50%"
        };

        var data = {
            textAlign: "left",
            display: "inline-block",
            marginTop: "30px"
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
            <div style={card}>
                <div style={avatarDiv}>
                    <img style={avatar} src={this.props.user.user.avatar} alt="Red dot" />
                    <input id="avatar" onChange={this.sendAvatar} style={input} type="file" />
                    <label style={editIcon} htmlFor="avatar"><img src="/icons/editAvatar.png" /></label>
                </div>
                <div>
                    <div style={data}>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        Nick:
                                    </td> 
                                    <td>
                                        {this.props.user.user.userName}
                                    </td> 
                                </tr>
                                <tr>
                                    <td>
                                        Email:
                                    </td>
                                    <td>
                                        {this.props.user.user.email}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAvatar: avatar => dispatch(updateAvatar(avatar))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);