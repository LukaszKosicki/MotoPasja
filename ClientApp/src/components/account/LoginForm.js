import React from "react";
import { Alert, Form, Button } from "reactstrap";
import MyAlert from "../common/MyAlert";
import EmailFormGroup from "../../containers/form/EmailFormGroup";
import PasswordFormGroup from "../../containers/form/PasswordFormGroup";

const LoginForm = ({ errorsList, isOpenAlert, dismissAlert, login, forgotPasswordForm }) => (
    <div>
        <div className="my-alert">
            <MyAlert
                errorsList={errorsList}
            />
            <Alert color="danger" isOpen={isOpenAlert} toggle={dismissAlert}>
                Żeby się zalogować uzupełnij poprawnie formularz!
                        </Alert>
        </div>
        <div className="conteredContent">
            <div className="loginForm">
                <Form>
                    <div>
                        <h4>Logowanie</h4>
                        <hr />
                    </div>
                    <EmailFormGroup />
                    <PasswordFormGroup
                        formName="login"
                    />
                    <div>
                        <Button type="button" onClick={login} color="primary">Zaloguj</Button>
                        <Button type="button" color="link" onClick={forgotPasswordForm}>Nie pamiętam hasła</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
);

export default LoginForm;