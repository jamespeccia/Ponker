import config from "../settings/config"
import {authHeader} from "../utils/auth"

export const userService = {
    login,
    register,
    getUser,
    getUsers,
    joinGame
};

const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', ...authHeader()};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/login`, requestOptions);
}


function getUser(username) {
    const requestOptions = {
        method: 'GET',
        headers
    };
    return fetch(`${config.apiUrl}/users/${username}`, requestOptions);
}

function getUsers(username) {
    const requestOptions = {
        method: 'GET',
        headers
    };
    return fetch(`${config.apiUrl}/users`, requestOptions);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/register`, requestOptions);
}


function joinGame(pin) {
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({pin})
    };
    return fetch(`${config.apiUrl}/game/join`, requestOptions);
}

export function update(payload) {
    console.log(payload);
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
    };
    return fetch(`${config.apiUrl}/users/update`, requestOptions)
        .then(response => response.json());
}