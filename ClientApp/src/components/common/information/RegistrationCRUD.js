import React from "react";
import Information from "../information/Information";
import { Button } from 'reactstrap';

export default class RegistrationCRUD extends React.Component {
    render() {
        var editDivStyles = {
            textAlign: 'right'
        };
        if (this.props.isAuthor) {
            return (
                <div style={editDivStyles}>
                    <Information
                        informations={this.props.informations}
                    />
                    <Button onClick={this.props.edit} color="link">Edytuj</Button>
                    {
                        this.props.delete !== undefined &&
                        <Button onClick={this.props.delete} color="link">Usuń</Button>
                    }
                </div>
            );
        } else {
            return (
                <div style={editDivStyles}>
                    <Information
                        informations={this.props.informations}
                    />
                </div>
            );
        }
    }
}