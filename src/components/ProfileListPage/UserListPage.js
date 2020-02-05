import React, {Component} from 'react';
import {userService} from "../../services/user.service";
import UserListItem from "./UserListItem";
import {NavigationBar} from "../NavigationBar/NavigationBar";
import {Container, ListGroup} from "react-bootstrap";

class UserListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        userService.getUsers()
            .then(response => response.json())
            .then(response => {
                this.setState({users: response.users});
                console.log(response.users)
            });
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Container className="my-5">
                    <h1 className="mb-3">Users</h1>
                    <ListGroup horizonal="lg" className="list-group-flush">
                        {this.state.users.map((i) => React.createElement(UserListItem, {username: i}))}
                    </ListGroup>
                </Container>
            </React.Fragment>
        );
    }
}

export default UserListPage;