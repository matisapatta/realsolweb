import axios from 'axios';

// export function getSalas(value) {
//     const request = axios.get(`${URL}/salas?name=${value.searchValue}`)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             let salaName = data;
//             axios.get(`${URL}/salas?location=${value.searchValue}`)
//                 .then(({ data }) => {
//                     let salaLocation = data;
//                     let send = [];
//                     if (salaName.length !== 0)
//                         send.push(...salaName);
//                     if (salaLocation.length !== 0)
//                         send.push(...salaLocation);
//                     dispatch({
//                         type: 'GET_SALAS',
//                         payload: send
//                     })
//                 })
//         })
//     }
// }

// export function getSalas(value) {
//     const request = axios.get(`/api/getsala?&name=${value.name}`)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             let sala = data;
//             dispatch({
//                 type: 'GET_SALAS',
//                 payload: sala
//             })
//         })
//     }
// }

export function getSalas(value) {

    let uri = "/api/getsala?";
    if (value.name !== '')
        uri = uri + `&name=${value.name}`;
    if (value.location !== '')
        uri = uri + `&location=${value.location}`;
    if (value.pricefrom !== "0")
        uri = uri + `&pricefrom=${value.pricefrom}`;
    if (value.priceto !== "0")
        uri = uri + `&priceto=${value.priceto}`;
    const request = axios.get(uri)
    return (dispatch) => {
        request.then(({ data }) => {
            let sala = data;
            dispatch({
                type: 'GET_SALAS',
                payload: sala
            })
        })
    }
}

export function getSalasOwner(id) {
    const request = axios.get(`/api/getsalasowner?id=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_SALA_OWNER',
                payload: send
            })
        })
    }
}



// export function getSalaDetail(id) {
//     const request = axios.get(`${URL}/salas?_id=${id}`)

//     return (dispatch) => {
//         request.then(({ data }) => {
//             let send;
//             if (data)
//                 send = data[0];
//             else
//                 send = null;
//             dispatch({
//                 type: 'GET_SALA_DETAIL',
//                 payload: send
//             })
//         })
//     }
// }

export function getSalaDetail(id) {
    const request = axios.get(`/api/sala?_id=${id}`)

    return (dispatch) => {
        request.then(({ data }) => {
            let send;
            if (data)
                send = data;
            else
                send = null;
            dispatch({
                type: 'GET_SALA_DETAIL',
                payload: send
            })
        })
    }
}

export function testSalaSave(sala) {
    const request = axios.post(`/api/testsalasave`, sala)
    return (dispatch) => {
        request.then(({ data }) => {
            // let sala = data.success ? data.sala : null;
            let sala = data.sala ? data.sala : false;
            let response = {
                // success: data.success,
                sala
            }
            dispatch({
                type: 'TEST_SALA',
                payload: response
            })
        })
    }
}

export function cleanProps() {
    return ({
        type: 'CLEAN_PROPS',
        payload: null
    })
}

export function saveSala(sala) {
    const request = axios.post(`/api/savesala`, sala)

    return (dispatch) => {
        request.then(({ data }) => {
            // let sala = data.success ? data.sala : null;
            let sala = data.sala ? data.sala : false;
            let response = {
                // success: data.success,
                sala
            }
            dispatch({
                type: 'SAVE_SALA',
                payload: response
            })
        })
    }
}

export function updateSala(sala) {
    const request = axios.post(`/api/updatesala`, sala)
    return (dispatch) => {
        request.then(({ data }) => {
            // let sala = data.success ? data.sala : null;
            let sala = data.sala ? data.sala : false;
            let response = {
                // success: data.success,
                ...sala
            }
            dispatch({
                type: 'UPDATE_SALA',
                payload: response
            })
        })
    }
}

export function deleteSala(sala) {
    const request = axios.post(`/api/deletesala?id=${sala.id}`, sala)
    return (dispatch) => {
        request.then(({ data }) => {
            let sala = data.deleted;
            let response = {
                ...sala
            }
            dispatch({
                type: 'DELETE_SALA',
                payload: response
            })
        })
    }
}


export function getCurrentState() {
    return {
        type: 'GET_CURRENT_STATE',
    }
}
