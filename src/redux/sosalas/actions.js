import axios from 'axios';
import { URL } from '../../config';

export function getSalas(value) {
    const request = axios.get(`${URL}/salas?name=${value.searchValue}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let salaName = data;
            axios.get(`${URL}/salas?location=${value.searchValue}`)
                .then(({ data }) => {
                    let salaLocation = data;
                    let send = [];
                    if (salaName.length !== 0)
                        send.push(...salaName);
                    if (salaLocation.length !== 0)
                        send.push(...salaLocation);
                    dispatch({
                        type: 'GET_SALAS',
                        payload: send
                    })
                })
        })
    }
}

export function getSalaDetail(id) {
    const request = axios.get(`${URL}/salas?_id=${id}`)

    return(dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send =  data[0];
            else
                send =  null;
            dispatch({
                type: 'GET_SALA_DETAIL',
                payload: send
            })
        })
    }
}

export function getCurrentState() {
    return {
        type: 'GET_CURRENT_STATE',
    }
}