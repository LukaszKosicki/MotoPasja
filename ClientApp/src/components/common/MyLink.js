import React from "react";
import "../common/MyLink.css";

export default function MyLink({ text, click }) {
    return (
        <p onClick={click} className="myLink">{text}</p>
        );
} 