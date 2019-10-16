import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

export default class LoadingPage extends React.Component {
    render() {
        var textMargin = {
            marginTop: "40px"
        };

        return (
            <div>
                <RiseLoader
                    color={"grey"}
                />
                <h6 style={textMargin}>please wait...</h6>
            </div>
            );
    }
}