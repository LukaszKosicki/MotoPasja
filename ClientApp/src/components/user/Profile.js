import React from "react";
import GetUser from "./container/GetUser";
import UserTabs from "./UserTabs";
import "./Profile.css";
import { connect } from "react-redux";

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    render() {
        return (
            <div>
                <h1>Profil</h1>
                <div className="user-profile">
                        <GetUser
                            userName={this.props.match.params.userName}
                        />
                    </div>
                <UserTabs
                    userName={this.props.match.params.userName}
                />
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(MyProfile);
