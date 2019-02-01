import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        url: `${config.apiUrl}/api/user/authenticate`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ username, password })
    };

    return axios(requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        url: `${config.apiUrl}/api/user`,
        headers: authHeader()
    };

    return axios(requestOptions)
        .then(handleResponse)
        .catch(error => {
            console.error('getAll', error);
        })
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        url: `${config.apiUrl}/api/user/${id}`,
        headers: authHeader()
    };
    return axios(requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        url: `${config.apiUrl}/api/user/register`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(user)
    };
    return axios(requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        url: `${config.apiUrl}/api/user/${user.id}`,
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        data: JSON.stringify(user)
    };

    return axios(requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        url: `${config.apiUrl}/api/user/${id}`,
        headers: authHeader()
    };
    return axios(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response.data)
    if (response.statusText != 'OK') {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data;
}