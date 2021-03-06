import axios from 'axios';

export function userRegister(user) {
    const request = axios.post(`/api/register`, user)
    return (dispatch) => {
        request.then(({ data }) => {
            let users = data.success ? data.user : data.err;
            let response = {
                success: data.success,
                users
            }
            dispatch({
                type: 'USER_REGISTER',
                payload: response
            })
        })
    }
}

export function getUsers() {
    const request = axios.get('/api/users')
        .then(response => response.data)
    return {
        type: 'GET_USERS',
        payload: request
    }
}

export function loginUser({ email, password, rememberMe }) {
    const request = axios.post('/api/login', { email, password, rememberMe })
    return (dispatch) => {
        request.then(({ data }) => {
            let response = data;
            dispatch({
                type: 'USER_LOGIN',
                payload: response
            })
        })
    }
}


export function auth() {
    const request = axios.get('/api/auth');
    return (dispatch) => {
        request.then(({ data }) => {
            let response = data;
            dispatch({
                type: 'USER_AUTH',
                payload: response
            })
        })
    }
}

export function updateUser(data) {
    const request = axios.post(`/api/userupdate`, data);
    return (dispatch) => {
        request.then(({ data }) => {
            let response = data;
            dispatch({
                type: 'UPDATE_USER',
                payload: response
            })
        })
    }
}

export function activateUser(data) {
    const request = axios.post(`/api/activateuser`, data);
    return (dispatch) => {
        request.then(({ data }) => {
            let response = data;
            dispatch({
                type: 'UPDATE_USER',
                payload: response
            })
        })
    }
}
