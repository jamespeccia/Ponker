import React, {Component} from 'react';
import {NavigationBar} from "../NavigationBar/NavigationBar";
import {Container} from "react-bootstrap";
import "./HomePage.css"

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Container className="my-5 text-center">
                    <h1>Welcome to Ponker!</h1>
                </Container>
            </React.Fragment>
        );
    }
}

export default HomePage;