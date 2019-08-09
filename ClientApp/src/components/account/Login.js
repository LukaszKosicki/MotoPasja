﻿import React from 'react';
import { FormFeedback, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import Email from "../../js/Email";
import Text from "../../js/Text";
import './FormStyles.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            },
            password: {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            }
        };
    }

    handleChange = event => {
        var valid = false;
        var invalid = false;
        var statement = "";

        if (event.target.name === "email") {
            if (Email.CheckEmail(event.target.value)) {
                valid = true;
                invalid = false;
                statement = "Adres jest prawidłowy :)";
            } else {
                valid = false;
                invalid = true;
                statement = "Niepoprawny adres e-mail!";
            }
        }

        if (event.target.name === "password") {
            if (Text.IsNullOrEmpty(event.target.value)) {
                valid = true;
                invalid = false;
                statement = ""
            } else {
                valid = false;
                invalid = true;
                statement = "Wpisz poprawne hasło!"
            }
        }

        this.setState({
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
                valid: valid,
                invalid: invalid,
                statement: statement
            }
        });
    }

    login = () => {
        var loginModel = {
            userName: this.state.email,
            password: this.state.password
        };

        if (this.state.email["valid"] && this.state.password["valid"]) {
            $.ajax({
                url: "account/login",
                type: "post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(loginModel),
                success: (data) => {
                    console.log(data);
                }
            });
        }
    }

    render() {
        var parentDiv = {
            textAlign: 'center'
        };
        var childDiv = {
            textAlign: 'left',
            display: 'inline-block',
            margin: '0px'
        };
        return (
            <div style={parentDiv}>
                <div className="loginForm" style={childDiv}>
                    <Form>
                        <div style={parentDiv}>
                            <h4>Logowanie</h4>
                            <hr />
                        </div>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input valid={this.state.email["valid"]} invalid={this.state.email["invalid"]} onChange={this.handleChange} type="email" name="email" id="exampleEmail" />
                            <FormFeedback valid={this.state.email["valid"]}>{this.state.email["statement"]}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input valid={this.state.password["valid"]} invalid={this.state.password["invalid"]} onChange={this.handleChange} type="password" name="password" id="examplePassword" />
                            <FormFeedback valid={this.state.password["valid"]}>{this.state.password["statement"]}</FormFeedback>
                        </FormGroup>
                        <div style={parentDiv}>
                            <Button type="button" onClick={this.login} color="primary">Zaloguj</Button>
                            <Button type="button" color="link">Nie pamiętam hasła</Button>
                        </div>
                    </Form>
                </div>
            </div>
            );
    }
}