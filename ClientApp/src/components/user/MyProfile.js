import React from "react";
import UserCard from "../user/partial/UserCard";

export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    render() {
        return (
            <div>
                <UserCard />
            </div>
            );
    }
}


