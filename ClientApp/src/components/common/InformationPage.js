import React from "react";

export default function InformationPage(props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
        );
}