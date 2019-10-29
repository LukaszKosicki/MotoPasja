import React from "react";
import { Form, Button } from "reactstrap";
import PasswordFormGroup from "../../containers/form/PasswordFormGroup";
import ConfirmedPasswordFormGroup from "../../containers/form/ConfirmedPasswordFormGroup";
import MyAlert from "../common/MyAlert";

const ChangePasswordForm = ({ errorsList, resetPassword }) => (
    <div>
        <div className="my-alert">
            <MyAlert
                errorsList={errorsList}
                />
        </div>
        <div className="conteredContent">
            <div className="loginForm">
                <Form>
                    <div>
                        <h4>Reset hasła</h4>
                        <hr />
                    </div>
                    <PasswordFormGroup />
                    <ConfirmedPasswordFormGroup />
                    <div>
                        <Button onClick={resetPassword} color="primary" type="button">Wyślij</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
);

export default ChangePasswordForm;