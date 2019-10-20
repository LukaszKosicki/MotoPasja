import React from "react";
import Avatar from "react-avatar-edit";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { updateAvatar } from "../../store/actions/loggedUser";
  
class MyAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null
        }
    }

    onCrop = (newAvatar) => {
        this.setState({
            avatar: newAvatar.slice(22)
        });

    }

    sendAvatar = (e) => {
        var formData = new FormData();
        formData.append("avatar", this.state.avatar);

        fetch("User/UpdateAvatar", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(res => {
                this.props.getUser();
                this.props.close();
            });
    }

    render() {
        var divStyles = {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0px",
            left: "0px",
            backgroundColor: "#f8f9fa",
            zIndex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
        var buttonsDiv = {
            marginTop: "15px",
            textAlign: "center"
        }
        var buttonStyles = {
            marginRight: "20px"
        };
     
        return (
            <div style={divStyles} >
                <div>
                    <Avatar
                        width="300"
                        onCrop={this.onCrop}
                        imageWidth="300"
                    />
                    <div style={buttonsDiv}>
                        <Button style={buttonStyles} outline onClick={this.sendAvatar} color="primary">Zapisz</Button>
                        <Button outline onClick={this.props.close} color="danger">Anuluj</Button>
                    </div>
                </div>
            </div>
            );
    }
}

const mapDispatchToProps = dispatch => ({
    updateAvatar: avatar => dispatch(updateAvatar(avatar))
});

export default connect(null, mapDispatchToProps)(MyAvatar);