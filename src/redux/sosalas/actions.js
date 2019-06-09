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
    if(value.name!=='')
    uri= uri+`&name=${value.name}`;
    if(value.location!=='')
    uri= uri+`&location=${value.location}`;
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

export function getSalasOwner(id){
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
            let sala = data.success ? data.sala : null;
            let response = {
                success: data.success,
                sala
            }
            dispatch({
                type: 'TEST_SALA',
                payload: response
            })
        })
    }
}

export function saveSala(sala) {
    const request = axios.post(`/api/savesala`, sala)
    
    return (dispatch) => {
        request.then(({ data }) => {
            let sala = data.success ? data.sala : null;
            let response = {
                success: data.success,
                sala
            }
            dispatch({
                type: 'SAVE_SALA',
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
