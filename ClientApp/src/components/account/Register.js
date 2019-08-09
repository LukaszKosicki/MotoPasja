import React from 'react';
import { Col, FormFeedback, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import Text from "../../js/Text";
import Email from "../../js/Email";
import './FormStyles.css';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            },
            email: {
                value: "",
                valid: false,
                invalid: false,
                statemant: ""
            },
            password: {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            },
            passwordRepeated: {
                value: "",
                valid: false,
                invalid: false,
                statement: ""
            },
        };
    }

    handleChange = event => {
        var valid = false;
        var invalid = false;
        var statement = "";

        if (event.target.name === "nick") {
            if (Text.IsNullOrEmpty(event.target.value)) {
                valid = true;
                invalid = false;
                statement = "Może być :)";
            } else {
                valid = false;
                invalid = true;
                statement = "Błędny nick! Sprawdź czy w nicku nie ma pustych znaków.";
            }
        }

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
            if (Text.CheckPassword(event.target.value)) {
                valid = true;
                invalid = false;
                statement = "Może być :)";
                
            } else {
                valid = false;
                invalid = true;
                statement = "Hasło musi zawierać conajmniej jedną małą i dużą literę, liczbę oraz znak specjalny!";
            }
        }

        if (event.target.name === "passwordRepeated") {
            if (this.state.password["value"] === event.target.value) {
                valid = true;
                invalid = false;
                statement = "Hasła są zgodne.";
            } else {
                valid = false;
                invalid = true;
                statement = "Hasła muszą być identyczne!";
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

    register = () => {
        var registerModel = {
            userName: this.state.nick["value"],
            email: this.state.email["value"],
            password: this.state.password["value"],
            passwordRepeated: this.state.passwordRepeated["value"]
        };

        if (this.state.nick["valid"] && this.state.email["valid"] && this.state.password["valid"] &&
            this.state.passwordRepeated["valid"]) {
            $.ajax({
                url: "account/register",
                type: "post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(registerModel),
                success: (data) => {
                    console.log(data);
                }
            });
        } else {
            alert("Żeby się zarejestrować popraw błędy w formularzu!");
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
            <div>
                <div style={parentDiv}>
                    <div className="loginForm" style={childDiv}>
                        <Form>
                            <div style={parentDiv}>
                                <h4>Rejestracja</h4>
                                <hr />
                            </div>
                            <FormGroup>
                                <Label for="exampleNick">Nick</Label>
                                <Input valid={this.state.nick["valid"]} invalid={this.state.nick["invalid"]} onChange={this.handleChange} type="text" name="nick" id="exampleNick" />
                                <FormFeedback valid={this.state.nick["valid"]}>{this.state.nick["statement"]}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input valid={this.state.email["valid"]} invalid={this.state.email["invalid"]} onChange={this.handleChange} type="email" name="email" id="exampleEmail" />
                                <FormFeedback valid={this.state.email["valid"]}>{this.state.email["statement"]}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Hasło</Label>
                                <Input valid={this.state.password["valid"]} invalid={this.state.password["invalid"]} onChange={this.handleChange} type="password" name="password" id="examplePassword" />
                                <FormFeedback valid={this.state.password["valid"]}>{this.state.password["statement"]}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePasswordRepeated">Powtórz hasło</Label>
                                <Input valid={this.state.passwordRepeated["valid"]} invalid={this.state.passwordRepeated["invalid"]} onChange={this.handleChange} type="password" name="passwordRepeated" id="examplePasswordRepeated" />
                                <FormFeedback valid={this.state.passwordRepeated["valid"]}>{this.state.passwordRepeated["statement"]}</FormFeedback>
                            </FormGroup>
                            <div style={parentDiv}>
                                <Button onClick={this.register} type="button" color="primary">Zarejestruj się</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            );
    }
}