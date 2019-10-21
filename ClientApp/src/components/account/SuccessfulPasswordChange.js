import React from "react";
import { NavLink } from "reactstrap";
import { Link } from 'react-router-dom';

export default function SuccessfulPasswordChange() {
    return (
        <div>
            <h4>Gratulacje!</h4>
            <p>Hasło zostało zmienione pomyślnie. Możesz się <a href="#/login">zalogować</a> używając nowego hasła!</p>
        </div>
        );
}