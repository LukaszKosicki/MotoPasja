import React from "react";
import EmailFormGroup from "../../containers/form/EmailFormGroup";
import { Button, Alert } from "reactstrap";
import MyAlert from "../common/MyAlert";

const PasswordRecovery = ({ generateEmail, cancel, isOpenAlert, dismissAlert, errorsList }) => (
    <div>
        <div className="my-alert">
            <MyAlert
                errorsList={errorsList}
            />
            <Alert color="danger" isOpen={isOpenAlert} toggle={dismissAlert}>
                Żeby zresetować hasło, podaj poprawnie adres e-mail!
                            </Alert>
        </div>
        <div className="conteredContent">
            <div className="loginForm">
                <div>
                    <h4>Odzywkiwanie hasła</h4>
                    <hr />
                </div>
                <EmailFormGroup />
                <div>
                    <Button className="w-50" onClick={generateEmail} type="button" color="primary">
                        Zresetuj hasło</Button>
                    <Button className="w-50" outline onClick={cancel} type="button" color="danger">
                        Anuluj</Button>
                </div>
            </div>
        </div>
    </div>
);

export default PasswordRecovery;