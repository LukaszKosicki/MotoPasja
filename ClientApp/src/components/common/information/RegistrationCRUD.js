import React from "react";
import Information from "../information/Information";
import { Button } from 'reactstrap';

export default class RegistrationCRUD extends React.Component {

   

    render() {
        var editDivStyles = {
            textAlign: 'right'
        };
        return (
            <div style={editDivStyles}>
                <Information
                    informations={this.props.informations}
                />
                <Button onClick={this.props.edit} color="link">Edytuj</Button>
                <Button onClick={this.props.delete} color="link">Usuń</Button >
            </div>
            );
    }
}