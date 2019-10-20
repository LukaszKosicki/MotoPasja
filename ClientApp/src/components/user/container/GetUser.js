import React from "react";
import UserAvatar from "../presentational/UserAvatar";
import UserData from "../presentational/UserData";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { resetForm } from "../../../store/actions/loginRegisterForm";

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                avatar: "",
                userName: "",
                email: ""
            },
            editData: false,
            editBtn: {
                text: "Edytuj",
                color: "primary"
            }
        }
    }

    componentDidMount() {
        this.getUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.editData !== this.state.editData) {
            if (this.state.editData) {
                this.setState({
                    editBtn: {
                        color: "danger",
                        text: "Anuluj"
                    }
                });
            } else {
                this.setState({
                    editBtn: {
                        color: "primary",
                        text: "Edytuj"
                    }
                });
            }
        }
    }

    getUser = () => {
        fetch("user/getUser/?userName=" + this.props.userName)
            .then(resp => resp.json())
            .then(user => this.setState({
                user: user
            }))    
    }

    editData = () => {
        this.props.resetForm();
        this.setState({
            editData: !this.state.editData
        });
    }

    render() {
        var editBtn = {
            position: "absolute",
            top: "0px",
            right: "0px"
        };
        return (
            <div>
                <div className="user-avatar">
                    <UserAvatar
                        avatar={this.state.user.avatar}
                        userName={this.props.userName}
                        getUser={this.getUser}
                    />
                </div>
                <div className="user-data">
                    <UserData
                        userName={this.props.userName}
                        email={this.state.user.email}
                        getUser={this.getUser}
                        edit={this.state.editData}
                        editData={this.editData}
                    />
                </div>
                {this.props.userName === this.props.user.user.userName &&
                    <Button onClick={this.editData} style={editBtn} type="button" color={this.state.editBtn.color}>
                        {this.state.editBtn.text}</Button>
                }
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(resetForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(GetUser);