import React from "react";
import { FormText } from "reactstrap";
import "./BlogInformation.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { Link } from 'react-router-dom';

class BlogInformation extends React.Component {
    render() {
        var formText = {
            marginTop: "0px"
        };
        return (
            <div className="blogInformation">
                <img src={this.props.authorAvatar} />
                <div className="informations">
                    <FormText style={formText}>Autor: <Link to={"/myProfile/" + this.props.author}>{this.props.author}</Link></FormText>
                    <FormText style={formText}>Data utworzenia: {this.props.dateOfAddition}</FormText>
                    <FormText style={formText}>Ostatnia aktywność: {this.props.dateOfLastEdition}</FormText>
                </div>
                {this.props.author === this.props.userName &&
                    <Button onClick={this.props.edit} type="button" color="link">Edytuj</Button>
                }
            </div>
            );
    }
}

const mapStateToProps = state => ({
    userName: state.user.user.userName
});

export default connect(mapStateToProps)(BlogInformation);