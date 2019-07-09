import axios from 'axios';

export function getMoneyByUser(id) {
    const request = axios.get(`/api/totalmoneybyuser?user=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_MONEY_BY_USER',
                payload: send
            })
        })
    }
}

export function getMoneyByUser7(id) {
    const request = axios.get(`/api/totalmoneybyuser?user=${id}&seven=true`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_MONEY_BY_USER_7',
                payload: send
            })
        })
    }
}
export function getMoneyBySala(id) {
    const request = axios.get(`/api/totalmoneybysala?user=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_MONEY_BY_SALA',
                payload: send
            })
        })
    }
}

export function getMoneyBySala7(id) {
    const request = axios.get(`/api/totalmoneybysala?user=${id}&seven=true`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_MONEY_BY_SALA_7',
                payload: send
            })
        })
    }
}

export function getAmountRes(id) {
    const request = axios.get(`/api/reservationsbyday?user=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_RESERV',
                payload: send
            })
        })
    }
}

export function getAmountRes7(id) {
    const request = axios.get(`/api/reservationsbyday?user=${id}&seven=true`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_RESERV_7',
                payload: send
            })
        })
    }
}

export function getNextReserv(id) {
    const request = axios.get(`/api/nextreservation?id=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'NEXT_RESERV',
                payload: send
            })
        })
    }
}

export function getLastReview() {
    const request = axios.get(`/api/lastreview?`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'LAST_REVIEW',
                payload: send
            })
        })
    }
}

export function getLastSala() {
    const request = axios.get(`/api/latestsala?`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'LATEST_SALA',
                payload: send
            })
        })
    }
}

