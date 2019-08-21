import React from "react";
import { Link } from 'react-router-dom';

export default class NoData extends React.Component {
    render() {

        var topMargin = {
            marginTop: "30vh"
        };

        return (
            <div style={topMargin}>
                <img src="/icons/sad.png" />
                <h6>Brak danych do załadowania!</h6>
                <Link to="/newBlog">Dodaj pierwszy blog</Link>
            </div>
            );
    }
}