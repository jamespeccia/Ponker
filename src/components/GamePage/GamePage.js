import React, {Component} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";
import {NavigationBar} from "../NavigationBar/NavigationBar";
import {userService} from "../../services/user.service";
import socketIOClient from "socket.io-client";

class GamePage extends Component {

    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const socket = socketIOClient("http://localjos");
        socket.on("outgoing data", data => this.setState({response: data.num}));
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({message: e.target.value})
    }

    handleSend(e) {
        e.preventDefault();
        userService.emit(this.state.message)
            .then(response => response.json())
            .then(response => console.log(response))
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Modal.Dialog style={{left: "50vw", transform: "translate(-50vw, 30vh)"}}>
                    <Modal.Header>
                        <Modal.Title>Emit message</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Enter the message below</p>
                        <FormControl block type="text" placeholder="Message" onChange={this.handleChange}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button block variant="primary" onClick={this.handleJoin}>Send</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default GamePage;