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

export function updateName(name) {
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({name})
    };
    return fetch(`${config.apiUrl}/users/name`, requestOptions);
}

export function updateUsername(username) {
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({username})
    };
    return fetch(`${config.apiUrl}/users/username`, requestOptions);
}

export function updateEmail(email) {
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({email})
    };
    return fetch(`${config.apiUrl}/users/email`, requestOptions);
}

export function updateBio(bio) {
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({bio})
    };
    return fetch(`${config.apiUrl}/users/bio`, requestOptions);
}

export function updatePassword(password) {
    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({password})
    };
    return fetch(`${config.apiUrl}/users/password`, requestOptions);
}

export function updateAvatar(avatar) {

    const avatarHeaders = {...authHeader(), 'Content-Type': 'multipart/form-data'};
    const requestOptions = {
        method: 'PUT',
        headers: avatarHeaders,
        body: avatar
    };
    return fetch(`${config.apiUrl}/users/avatar`, requestOptions);
}
