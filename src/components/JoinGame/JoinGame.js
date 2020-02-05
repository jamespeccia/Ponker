import React, {Component} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";
import {NavigationBar} from "../NavigationBar/NavigationBar";
import {connect} from "react-redux"
import {userActions} from "../../actions/actions";

class JoinGame extends Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({pin: e.target.value})
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleJoin(e) {
        e.preventDefault();
        this.props.join(this.state.pin)
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Modal.Dialog style={{left: "50vw", transform: "translate(-50vw, 30vh)"}}>
                    <Modal.Header>
                        <Modal.Title>Join Game</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Enter the game pin below</p>
                        <FormControl block type="text" placeholder="PIN" onChange={this.handleChange}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleJoin}>Join</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

const actionCreators = {
    join: userActions.joinGame
};

export default connect(null, actionCreators)(JoinGame);