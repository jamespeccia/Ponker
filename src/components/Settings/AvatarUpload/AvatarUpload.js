import React, {Fragment} from 'react';

import {updateAvatar} from "../../../services/user.service";
import {Button, Col, Row} from "react-bootstrap";

class AvatarUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: "",
            fileName: "Upload File"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = e => {
        this.setState({file: e.target.files[0]});
        this.setState({fileName: e.target.files[0].name});
    };

    handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        updateAvatar(formData)
            .then(response => response)
            .then(response => console.log(response))

    };

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={this.handleChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {this.state.fileName}
                            </label>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={this.handleSubmit}>Upload</Button>
                        </Col>
                    </Row>
                </form>

            </Fragment>
        );
    }
}

export default AvatarUpload;