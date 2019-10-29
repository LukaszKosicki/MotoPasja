import React from "react";

export default function SuccessfulPasswordChange() {
    return (
        <div className="conteredContent">
            <div className="loginForm">
                <h4>Gratulacje!</h4>
                <p>Hasło zostało zmienione pomyślnie. Możesz się <a href="#/login">zalogować</a> używając nowego hasła!</p>
            </div>
        </div>
        );
}