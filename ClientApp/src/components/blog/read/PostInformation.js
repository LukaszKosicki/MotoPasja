import React from "react";
import { FormText } from "reactstrap";

export default class PostInformation extends React.Component {
    render() {
        var divStyles = {
            textAlign: "left"
        };

        var formTextStyles = {
            marginRight: "10px",
            display: "inline-block"
        };

        return (
            <div style={divStyles}>
                <FormText style={formTextStyles}>Data dodania: {this.props.dateOfAddition}</FormText>
                {this.props.dateOfAddition !== this.props.editingDate &&
                    <FormText style={formTextStyles}>Data edycji: {this.props.editingDate}</FormText>
                }
            </div>
            );
    }
}
