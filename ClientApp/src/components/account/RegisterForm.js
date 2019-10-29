import React from "react";
import { Alert, Form, Button } from "reactstrap";
import MyAlert from "../common/MyAlert";
import UserNameFormGroup from "../../containers/form/UserNameFormGroup";
import EmailFormGroup from "../../containers/form/EmailFormGroup";
import PasswordFormGroup from "../../containers/form/PasswordFormGroup";
import ConfirmedPasswordFormGroup from "../../containers/form/ConfirmedPasswordFormGroup";

const RegisterForm = ({ errorsList, isOpenAlert, dismissAlert, register }) => (
    <div>
        <div className="my-alert">
            <MyAlert
                errorsList={errorsList}
            />
            <Alert color="danger" isOpen={isOpenAlert} toggle={dismissAlert}>
                Żeby się zarejestrować uzupełnij poprawnie formularz!
                    </Alert>
        </div>
        <div className="conteredContent">
            <div className="loginForm">
                <Form>
                    <div>
                        <h4>Rejestracja</h4>
                        <hr />
                    </div>
                    <UserNameFormGroup />
                    <EmailFormGroup />
                    <PasswordFormGroup
                        formName="registration"
                    />
                    <ConfirmedPasswordFormGroup />
                    <div>
                        <Button onClick={register} type="button" color="primary">Zarejestruj się</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    );

export default RegisterForm;