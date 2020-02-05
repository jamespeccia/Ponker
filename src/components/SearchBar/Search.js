import React from 'react'

import {Button, FormControl, InputGroup} from 'react-bootstrap'

function SearchBar() {
    return (
        <div id="search">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="@username"
                    aria-label="Username"
                />
                <Button variant="primary">Search</Button>
            </InputGroup>
        </div>
    )
}

export default SearchBar