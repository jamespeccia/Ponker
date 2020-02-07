import React from "react";
//Styling
import "./RegisterPage.css"
import {NavigationBar} from "../NavigationBar/NavigationBar";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap"


import {connect} from 'react-redux';
import {userActions} from "../../actions/actions";

class RegisterPage extends React.Component {

    VALID_EMAIL_REGEX = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    constructor(props) {
        super(props);
        this.state = {
            match: false,
            user: {
                username: "",
                email: "",
                password: "",
                confirmedPassword: ""
            },
            errors: {
                username: "",
                email: "",
                password: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;

        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'Username must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    this.VALID_EMAIL_REGEX.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({
            user: {
                ...user,
                [name]: value
            },
            errors
        });

        if (name === "confirm_password")
            this.setState({match: this.state.user.password === value});

        if (name === "password")
            this.setState({match: value === this.state.user.confirm_password});
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        if (this.validateForm(this.state.errors) && this.state.match) {
            this.props.register(this.state.user);
        }

    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false));
        return valid;
    };

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <div className="container rounded p-5 login-register-form" style={{backgroundColor: "#272727"}}>
                    <h1 className="mb-5">Register</h1>
                    <FormGroup inline className="form-group" controlId="username">
                        <FormLabel column={0}>Username</FormLabel>
                        <FormControl
                            autoFocus
                            name='username'
                            className="input"
                            type="plaintext"
                            onChange={this.handleChange}
                            isInvalid={this.state.usernameError || this.props.usernameError}
                        />
                        <FormControl.Feedback type="invalid">{this.props.usernameError}<br/>{this.state.errors.username}
                        </FormControl.Feedback>

                    </FormGroup>


                    <FormGroup className="form-group" controlId="email">
                        <FormLabel column={0}>Email</FormLabel>
                        <FormControl
                            name='email'
                            className="input"
                            type="email"
                            defaultValue={this.state.email}
                            onChange={this.handleChange}
                            isInvalid={this.state.emailError || this.props.emailError}
                        />

                        <FormControl.Feedback type="invalid">{this.props.emailError}<br/>{this.state.errors.email}
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="form-group" controlId="password">
                        <FormLabel column={0}>Password</FormLabel>
                        <FormControl
                            name='password'
                            className="input"
                            type="password"
                            defaultValue={this.state.password}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.password}
                            isValid={this.state.match}
                        />
                        <FormControl.Feedback type="invalid">{this.state.errors.password}</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="form-group" controlId="confirm_password">
                        <FormLabel column={0}>Confirm Password</FormLabel>
                        <FormControl
                            name='confirm_password'
                            className="input"
                            type="password"
                            defaultValue={this.state.password}
                            onChange={this.handleChange}
                            isValid={this.state.match && !this.state.errors.password}
                            isInvalid={!this.state.match && this.state.user.confirm_password !== "" && !this.state.errors.password}
                        />
                        <FormControl.Feedback type="valid"> </FormControl.Feedback>
                        <FormControl.Feedback type="invalid">Password does not match</FormControl.Feedback>
                    </FormGroup>

                    <Button block className="my-4" variant="primary" type="submit"
                            onClick={this.handleSubmit}>Register</Button>

                </div>

            </React.Fragment>

        );
    }
}

function mapStateToProps(state) {
    const {usernameError, emailError} = state.registration;
    return {usernameError, emailError};
}

const actionCreators = {
    register: userActions.register,
};

const connectedRegisterPage = connect(mapStateToProps, actionCreators)(RegisterPage);
export {connectedRegisterPage as RegisterPage};