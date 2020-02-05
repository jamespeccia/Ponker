import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux"
import {userActions} from "../../actions/actions";
import {NavigationBar} from "../NavigationBar/NavigationBar";
import "./Logout.css"

class Logout extends Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }


    render() {
        if (!this.props.authenticated)
            return (<div>
                <NavigationBar/>
                <span>You must be logged in to do that!</span>
            </div>);


        return (
            <React.Fragment>
                <NavigationBar/>
                <Modal.Dialog style={{left: "50vw", transform: "translate(-50vw, 30vh)"}}>
                    <Modal.Header>
                        <Modal.Title>Logout of Ponker?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You can log back in at any time.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCancel}>Cancel</Button>
                        <Button onClick={this.handleLogout}>Logout</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    const {authenticated} = state.authentication;
    return {authenticated};
}

const actionCreators = {
    logout: userActions.logout
};


const connectedLogoutPage = connect(mapStateToProps, actionCreators)(Logout);
export {connectedLogoutPage as LogoutPage}