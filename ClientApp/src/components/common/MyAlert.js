import React from "react";
import { Alert } from "reactstrap";



export default class MyAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            errorsList: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.errorsList.length > 0 &&
            (prevProps.errorsList.toString() !== this.props.errorsList.toString())) {
            const errors = this.props.errorsList.map((value, index) =>
                <p className="no-margin" key={"err" + index}>{value}</p>
            );
            this.setState({
                errorsList: errors,
                isOpen: true
            });
        }
    }
 
    dismissAlert = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Alert color="danger" isOpen={this.state.isOpen}
                toggle={() => {
                    this.setState({
                        isOpen: false
                    });
                }}>
                {this.state.errorsList}
            </Alert>
            );
    }
}
