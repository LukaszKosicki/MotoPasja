import React from "react";

const EmailConfirmedFailed = ({ errors }) => (
    <div className="conteredContent">
        <div className="loginForm">
            <h2>Błąd</h2>
            <hr/>
            {
                errors.map((value, index) =>
                    <p className="no-margin" key={`err${index}`}>{value}</p>
                    )
            }
        </div>
    </div>
);

export default EmailConfirmedFailed;