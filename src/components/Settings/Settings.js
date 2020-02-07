import React from "react"
//Styling
import "./styles.css"
import {Button, Col, Form, FormControl, FormLabel, Image, InputGroup, Modal, ModalDialog, Row} from "react-bootstrap"
import {NavigationBar} from "../NavigationBar/NavigationBar";
import picture from "./spade.png"
import AvatarUpload from "./AvatarUpload/AvatarUpload";
import {update} from "../../services/user.service";
import {connect} from "react-redux"


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: true,

            name: props.name,
            username: props.username,
            email: props.username,
            bio: "test",

            isUsernameEditable: false,
            isEmailEditable: false,

            response: {
                name: "",
                username: "",
                email: "",
                bio: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let {name, username, email, bio} = this.state;
        const payload = {name, username, email, bio};
        update(payload)
            .then(response => {
                this.setState(response);
            })
            .catch(error => console.log(error))
    }

    handleCancel(event) {
        event.preventDefault();
    }


    render() {
        const {showDialog, isNameEditable, isUsernameEditable, isEmailEditable, name, username, email, bio} = this.state;

        return (
            <React.Fragment>

                <NavigationBar/>

                <ModalDialog show={showDialog}
                             onHide={() => this.setState({"showDialog": false})}
                             aria-labelledby="contained-modal-title-vcenter" className="">

                    <Modal.Header closeButton>
                        <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form className="p-xs-0">
                            <Row className="align-text-center mb-5">
                                <Col xs="1">
                                    <Image src={picture} style={{height: "75px"}}/>
                                </Col>
                                <Col>
                                    <AvatarUpload/>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="pl-0">
                                    <FormLabel column={0}>Name</FormLabel>
                                    <InputGroup>
                                        <Form.Control readOnly={!isNameEditable} name="name"
                                                      onChange={this.handleChange} isInvalid={this.state.response.name}
                                                      defaultValue={name}/>
                                        <InputGroup.Append>
                                            <Button onClick={() => this.setState({isNameEditable: !isNameEditable})}
                                                    variant="outline-secondary">Edit</Button>
                                        </InputGroup.Append>
                                        <FormControl.Feedback
                                            type="invalid">{this.state.response.name}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col className="pr-0">
                                    <FormLabel column={0}>Username</FormLabel>
                                    <InputGroup>
                                        <Form.Control readOnly={!isUsernameEditable} name="username"
                                                      onChange={this.handleChange}
                                                      isInvalid={this.state.response.username}
                                                      defaultValue={username}/>
                                        <InputGroup.Append>
                                            <Button
                                                onClick={() => this.setState({isUsernameEditable: !isUsernameEditable})}
                                                variant="outline-secondary">Edit</Button>
                                        </InputGroup.Append>
                                        <FormControl.Feedback
                                            type="invalid">{this.state.response.username}</FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Form.Row className="my-3">
                                <FormLabel column={0}>Email</FormLabel>
                                <InputGroup>
                                    <Form.Control readOnly={!isEmailEditable} name="email"
                                                  onChange={this.handleChange} isInvalid={this.state.response.email}
                                                  defaultValue={email}/>
                                    <InputGroup.Append>
                                        <Button onClick={() => this.setState({isEmailEditable: !isEmailEditable})}
                                                variant="outline-secondary">Edit</Button>
                                    </InputGroup.Append>
                                    <FormControl.Feedback
                                        type="invalid">{this.state.response.email}</FormControl.Feedback>
                                </InputGroup>
                            </Form.Row>

                            <Form.Row>
                                <FormLabel column={0}>Bio</FormLabel>
                                <Form.Control style={{resize: "none"}} as="textarea" rows="2" name="bio"
                                              onChange={this.handleChange} isInvalid={this.state.response.bio}
                                              defaultValue={bio}/>
                                <FormControl.Feedback type="invalid">{this.state.response.bio}</FormControl.Feedback>
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

function mapStateToProps(state) {
    const {username, email} = state.authentication.user;
    return {username, email};
}


export default connect(mapStateToProps)(Settings)
