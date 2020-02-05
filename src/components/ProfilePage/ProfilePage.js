import React from "react"
import {Button, Card, FormControl, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap"
import {NavigationBar} from "../NavigationBar/NavigationBar";

import {userService} from "../../services/user.service";
import picture from "./spade.png"

//Styling


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingUser: true,
            foundUser: false,

            user: {
                username: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        userService.getUser(this.props.match.params.id)
            .then(response => response.json())
            .then(response => {
                if (response.message === "USER_FOUND") {
                    this.setState({foundUser: true, loadingUser: false, user: response.user});
                } else
                    this.setState({foundUser: false, loadingUser: false});
            })
        ;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            userService.getUser(this.props.match.params.id)
                .then(response => response.json())
                .then(response => {
                    if (response.message === "USER_FOUND")
                        this.setState({foundUser: true, loadingUser: false, user: response.user});
                    else
                        this.setState({foundUser: false, loadingUser: false});
                });
        }
    }


    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleClick(event) {
        event.preventDefault();
        const query = this.state.query;
        this.props.history.push(`/users/${query}`)
    }


    render() {

        if (!this.state.foundUser) {
            return (
                <React.Fragment>
                    <NavigationBar/>
                    <div className="container-fluid flex-column align-self-center my-5 mw-100"
                         style={{backgroundColor: "#121212", width: "40rem"}}>
                        <InputGroup className="mb-5 w-100">
                            <FormControl onChange={this.handleChange}
                                         placeholder="@username"
                                         aria-label="Username"
                                         name="query"
                            />
                            <Button variant="primary" onClick={this.handleClick}>Search</Button>
                        </InputGroup>
                        <h1 className="text-white text-center">User Not Found!</h1>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <NavigationBar/>
                <div className="container-fluid flex-column align-self-center my-5 mw-100 profile-background"
                     style={{backgroundColor: "#121212", width: "40rem"}}>
                    <InputGroup className="mb-5 w-100">
                        <FormControl onChange={this.handleChange}
                                     placeholder="@username"
                                     aria-label="Username"
                                     name="query"
                        />
                        <Button variant="primary" onClick={this.handleClick}>Search</Button>
                    </InputGroup>

                    <Card className="w-100 rounded border-0" style={{backgroundColor: "#272727"}}>
                        <Card.Img variant="top" className="h-50 w-50 mt-5 align-self-center" src={picture}/>
                        <Card.Body>
                            <Card.Title className="text-white">{this.state.user.username}</Card.Title>
                            <Card.Text className="text-white">@{this.state.user.username}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group">
                            <ListGroupItem className="list-group-item text-white"
                                           style={{backgroundColor: "#272727"}}><b>Status: </b>Online</ListGroupItem>
                            <ListGroupItem className="list-group-item text-white"
                                           style={{backgroundColor: "#272727"}}><b>Bio: </b>This is my
                                bio</ListGroupItem>
                            <ListGroupItem className="list-group-item text-white"
                                           style={{backgroundColor: "#272727"}}><b>Level: </b>1</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Button block variant="primary">Play</Button>
                        </Card.Body>
                    </Card>
                </div>

            </React.Fragment>
        )
    }
}


const connectedProfilePage = (ProfilePage);
export {connectedProfilePage as ProfilePage};