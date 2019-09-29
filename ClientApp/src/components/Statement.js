import React from "react";
import { withRouter } from "react-router";

class Statement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statement: ""
        };
    }
    /*
    componentDidMount() {
        if (this.props.location.state.statement != undefined) {
            this.setState({
                statement: "Strona wygasła"
            });
        } else {
            this.setState({
                statement: this.props.location.state.statement
            });
        }
    }
    */
    render() {
        var statementStyles = {
            display: "inline-block",
            position: "absolute",
            left: "50%",
            top: "50%"
        };
        return (
            <div style={statementStyles}>
                <p>{this.state.statement}</p>
            </div>
            );
    }
}

export default withRouter(Statement);