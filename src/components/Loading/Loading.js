import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";


import "./Loading.css"


class Loading extends Component {
    render() {
        return (
            <div className="container">
                <Spinner animation="border" variant="primary"/>
                <br/>
                <p>Loading...</p>
            </div>
        );
    }
}

export default Loading;