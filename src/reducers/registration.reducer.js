import {REGISTER_FAILURE, REGISTER_SUCCESS} from "../utils/constants";

const initialState = {
    usernameError: "",
    emailError: ""
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {};
        case REGISTER_FAILURE:
            return action.errors;
        default:
            return state
    }
}