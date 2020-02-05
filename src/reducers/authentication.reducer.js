import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../utils/constants";
import {cookies} from "../utils/cookies";
import jwt from "jwt-decode";


let user;
try {
    user = jwt(cookies.get('user'))
} catch (e) {
    user = null;
    cookies.remove("user")
}
const initialState = user ? {
    authenticated: true,
    user: {id: user.user.id, username: user.user.username, email: user.user.email}
} : {authenticated: false};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {authenticated: true, user: action.user};
        case LOGIN_FAILURE:
            return {error: true};
        case LOGOUT:
            return {};
        default:
            return state
    }
}