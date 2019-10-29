import React from "react";
import LoadingPage from "../../components/common/LoadingPage";
import { withRouter } from "react-router";
import EmailConfirmedSuccess from "../../components/account/EmailConfirmedSuccess";
import EmailConfirmedFailed from "../../components/account/EmailConfirmedFailed";

class ConfirmEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            errors: []
        };
    }

    componentDidMount() {
        const params = this.props.location.search.split('&');
        this.confirmEmail(params[0].slice(8, params[0].length), params[1].slice(6, params[1].length));
    }

    confirmEmail = (userId, token) => {
        var formData = new FormData();
        formData.append("userId", userId);
        formData.append("token", token);

        fetch("/Account/ConfirmEmail", {
            method: "PUT",
            body: formData
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log("start");
                if (resp.success) {
                    this.setState({
                        success: true
                    });
                } else {
                    this.setState({
                        success: false,
                        errors: resp.errors
                    });
                }
            })
            .catch(() => {
                this.props.history.push("/error");
            });
    }
    render() {
        if (this.state.success === null) {
            return (
                <LoadingPage />
            );
        } else if (this.state.success === true) {
            return (
                <EmailConfirmedSuccess />
            );
        } else {
            return (
                <EmailConfirmedFailed
                    errors={this.state.errors}
                    />
                );
        }
    }
}

export default withRouter(ConfirmEmail);