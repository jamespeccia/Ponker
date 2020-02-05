import React from "react"

import {Dropdown, DropdownButton, Nav, Navbar} from 'react-bootstrap'

import {connect} from "react-redux"

class NavigationBar extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.authenticated !== nextProps.authenticated
    }

    renderRightSide() {
        if (this.props.authenticated) {
            const userLink = `/users/${this.props.user.username}`;
            return (
                <DropdownButton block alignRight variant="primary" id="dropdown-menu-align-right"
                                title={this.props.user.username + " "}>
                    <Dropdown.Item href={userLink}>My Profile</Dropdown.Item>
                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </DropdownButton>
            )
        } else {
            return (
                <Nav>
                    <Nav.Link href="/login" style={{color: "white"}}>Login</Nav.Link>
                    <Nav.Link href="/register" style={{color: "white"}}>Register</Nav.Link>
                </Nav>
            )
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#272727"}}>
                <Navbar.Brand href="#home">Ponker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" style={{color: "white"}}>Join Game</Nav.Link>
                        <Nav.Link href="/users" style={{color: "white"}}>Users</Nav.Link>
                    </Nav>
                    {this.renderRightSide()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    const {authenticated, user} = state.authentication;
    return {authenticated, user};
}

const connectedNavigationBar = connect(mapStateToProps)(NavigationBar);
export {connectedNavigationBar as NavigationBar};