import React from "react";
//Styling
import "./LoginPage.css"
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap"
import {NavigationBar} from "../NavigationBar/NavigationBar";

import {connect} from 'react-redux';

import {userActions} from "../../actions/actions"

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.authenticated) {
            this.props.history.push("/")
        }

        this.state = {
            user: {
                email: "",
                password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;
        this.props.login(user);
    }


    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <div className="container rounded p-5 login-register-form" style={{backgroundColor: "#272727"}}>
                    <h1 className="mb-5">Login</h1>
                    <FormGroup controlId="email">
                        <FormLabel column={0}>Email</FormLabel>
                        <FormControl
                            autoFocus
                            name="email"
                            className="input"
                            type="email"
                            onChange={this.handleChange}
                            isInvalid={this.props.error}
                        />
                        <FormControl.Feedback type="invalid"> </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel column={0}>Password</FormLabel>
                        <FormControl
                            name="password"
                            className="input"
                            type="password"
                            onChange={this.handleChange}
                            isInvalid={this.props.error}
                        />
                        <FormControl.Feedback type="invalid">Incorrect email or password.</FormControl.Feedback>
                    </FormGroup>

                    <Button block className="my-4" variant="primary" type="submit"
                            onClick={this.handleSubmit}>Login</Button>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {error} = state.authentication;
    return {error};
}

const actionCreators = {
    login: userActions.login
};


const connectedLoginPage = connect(mapStateToProps, actionCreators)(LoginPage);
export {connectedLoginPage as LoginPage};