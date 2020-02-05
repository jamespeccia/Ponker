import React from "react"
//Styling
import "./styles.css"
import {Button, Col, Form, FormControl, FormLabel, Image, InputGroup, Modal, ModalDialog, Row} from "react-bootstrap"
import {updateEmail, updateName, updateUsername} from "../../services/user.service";
import {NavigationBar} from "../NavigationBar/NavigationBar";
import picture from "./spade.png"
import AvatarUpload from "./AvatarUpload/AvatarUpload";


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,

            name: props.name,
            username: props.username,
            email: props.email,
            bio: props.bio,

            successes: {
                name: false,
                username: false,
                email: false,
                bio: false
            },

            errors: {
                name: "",
                username: "",
                email: "",
                bio: ""
            },

            editable: {
                name: false,
                username: false,
                email: false,
                bio: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    handleChange(event) {
        const {name, value} = event.target;
        if (this.state.name !== value)
            this.setState({errors: {...this.state.errors, [name]: ""}});
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name, username, email, bio} = this.state;

        if (name !== this.props.name) {
            updateName(name)
                .then(response => response.json())
                .then(response => {
                    if (response.message === "SUCCESS")
                        this.setState({successes: {...this.state.successes, name: true}});
                    else
                        this.setState({errors: {...this.state.errors, name: response.message}});
                })
                .catch(() => this.setState({errors: {...this.state.errors, name: "Error!"}}))
        }

        if (username !== this.props.username) {
            updateUsername(username)
                .then(response => response.json())
                .then(response => {
                    if (response.message === "SUCCESS")
                        this.setState({successes: {...this.state.successes, username: true}});
                    else
                        this.setState({errors: {...this.state.errors, username: response.message}});
                })
                .catch(() => this.setState({errors: {...this.state.errors, username: "Error!"}}))
        }
        if (email !== this.props.email) {
            updateEmail(email)
                .then(response => response.json())
                .then(response => {
                    if (response.message === "SUCCESS")
                        this.setState({successes: {...this.state.successes, email: true}});
                    else
                        this.setState({errors: {...this.state.errors, email: response.message}});
                })
                .catch(() => this.setState({errors: {...this.state.errors, email: "Error!"}}))
        }
        if (bio !== this.props.bio) {
            updateEmail(bio)
                .then(response => response.json())
                .then(response => {
                    if (response.message === "SUCCESS")
                        this.setState({successes: {...this.state.successes, bio: true}});
                    else
                        this.setState({errors: {...this.state.errors, bio: response.message}});
                })
                .catch(() => this.setState({errors: {...this.state.errors, bio: "Error!"}}))
        }

    }

    handleCancel(event) {

    }


    render() {

        return (
            <React.Fragment>
                <NavigationBar/>
                <ModalDialog show={this.state.show}
                             onHide={() => this.setState({"show": false})}
                             aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form className="p-5 container-fluid">
                            <Row className="align-text-center mb-5">
                                <Col xs="1">
                                    <Image src={picture} style={{height: "75px"}}/>
                                </Col>
                                <Col>
                                    <AvatarUpload/>
                                </Col>
                            </Row>
                            <Form.Row>
                                <Col className="pl-0">
                                    <FormLabel column={0}>Name</FormLabel>
                                    <InputGroup>
                                        <Form.Control readOnly={!this.state.editable.name} name="name"
                                                      onChange={this.handleChange} isInvalid={this.state.errors.name}
                                                      defaultValue={this.state.name}/>

                                        <InputGroup.Append>
                                            <Button onClick={() => this.setState({
                                                editable: {
                                                    ...this.state.editable,
                                                    name: !this.state.editable.name
                                                }
                                            })} variant="outline-secondary">Edit</Button>
                                        </InputGroup.Append>
                                        <FormControl.Feedback
                                            type="invalid">{this.state.errors.name}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col className="pr-0">
                                    <FormLabel block column={0}>Username</FormLabel>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control name="username" onChange={this.handleChange}
                                                      isInvalid={this.state.errors.username}
                                                      defaultValue={this.state.username}/>
                                        <FormControl.Feedback
                                            type="invalid">{this.state.errors.username}</FormControl.Feedback>
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary">Edit</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row className="my-3">
                                <FormLabel column={0}>Email</FormLabel>
                                <Form.Control name="email" onChange={this.handleChange}
                                              isInvalid={this.state.errors.email} defaultValue={this.state.email}/>
                                <FormControl.Feedback type="invalid">{this.state.errors.email}</FormControl.Feedback>
                            </Form.Row>

                            <Form.Row>
                                <FormLabel column={0}>Bio</FormLabel>
                                <Form.Control style={{resize: "none"}} as="textarea" rows="2" name="bio"
                                              onChange={this.handleChange} isInvalid={this.state.errors.bio}
                                              defaultValue={this.state.bio}/>
                                <FormControl.Feedback type="invalid">{this.state.errors.bio}</FormControl.Feedback>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </ModalDialog>
            </React.Fragment>
        )
    }
}


export default Settings
