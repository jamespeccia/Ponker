import {push} from 'connected-react-router'
import {userService} from "../services/user.service"
import {cookies} from "../utils/cookies";
import jwt from "jwt-decode"

import {
    COULD_NOT_CONNECT_TO_SERVER,
    COULD_NOT_DECODE_TOKEN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
} from "../utils/constants";

export const userActions = {
    login,
    logout,
    register,
    joinGame
};

function login(user) {
    return dispatch => {
        userService.login(user)
            .then(response => response.json())
            .then(response => {
                if (response.message === LOGIN_SUCCESS) {
                    try {
                        let token = jwt(response.token);
                        cookies.set("user", response.token);
                        dispatch({type: LOGIN_SUCCESS, user: token.user});
                        dispatch(push(`/users/${token.user.username}`));
                    } catch (e) {
                        dispatch({type: LOGIN_FAILURE, message: response.message});
                    }
                } else
                    dispatch({type: LOGIN_FAILURE, message: response.message});
            })
            .catch(error => {
                dispatch({type: LOGIN_FAILURE, message: COULD_NOT_CONNECT_TO_SERVER});
            });

    };
}


function logout() {
    return dispatch => {
        cookies.remove("user");
        dispatch({type: LOGOUT});
        dispatch(push("/"));
    }
}

function register(user) {
    return dispatch => {
        userService.register(user)
            .then(response => response.json())
            .then(response => {
                    if (response.message === REGISTER_SUCCESS) {
                        try {

                            if (response.token) {
                                let token = jwt(response.token);
                                cookies.set("user", response.token);
                                dispatch({type: LOGIN_SUCCESS, user: token.user});
                                dispatch(push(`/users/${token.user.username}`));
                            } else {
                                dispatch({type: LOGIN_FAILURE, user});
                                dispatch(push(`/login`));
                            }
                        } catch (e) {
                            dispatch({type: LOGIN_FAILURE, message: COULD_NOT_DECODE_TOKEN});
                        }
                    } else {
                        if (response.message === "USERNAME_ALREADY_EXISTS")
                            dispatch({type: REGISTER_FAILURE, errors: {usernameError: "That username is already taken."}});
                        else if (response.message === "EMAIL_ALREADY_EXISTS")
                            dispatch({type: REGISTER_FAILURE, errors: {emailError: "That email already exists."}});
                        else
                            dispatch({type: REGISTER_FAILURE, errors: {other: "Error"}});

                    }
                }
            )
            .catch(error => {
                dispatch({type: REGISTER_FAILURE, message: COULD_NOT_CONNECT_TO_SERVER});
            });

    };
}

function joinGame(pin) {
    return dispatch => {
        userService.joinGame(pin)
            .then(response => response.json())
            .then(response => {
                    if (response.message === "ROOM_EXISTS") {
                        dispatch({type: "JOIN_GAME_SUCCESS", pin: pin});
                        dispatch(push(`/game/${pin}`));
                    } else {
                        dispatch({type: "JOIN_GAME_FAILURE", message: response.message});
                    }
                }
            )
            .catch(error => {
                dispatch({type: "JOIN_GAME_FAILURE", message: COULD_NOT_CONNECT_TO_SERVER});
            });
    };
}