import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

export default class LoadingPage extends React.Component {
    render() {

        var topMargin = {
            marginTop: "30vh"
        };
        var textMargin = {
            marginTop: "40px"
        };

        return (
            <div style={topMargin}>
                <RiseLoader
                    color={"grey"}
                />
                <h6 style={textMargin}>please wait...</h6>
            </div>
            );
    }
}