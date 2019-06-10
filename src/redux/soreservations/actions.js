import axios from 'axios';


// export function getSalaDetail(id) {
//     const request = axios.get(`/api/sala?_id=${id}`)

//     return (dispatch) => {
//         request.then(({ data }) => {
//             let send;
//             if (data)
//                 send = data;
//             else
//                 send = null;
//             dispatch({
//                 type: 'GET_SALA_DETAIL',
//                 payload: send
//             })
//         })
//     }
// }


export function initReservations(data) {
    const request = axios.post(`/api/initreservations`, data)
    console.log("func" + data)
    return (dispatch) => {
        request.then(({ data }) => {
            let reservations = data.reservations ? data.reservations : false;
            let response = {
                // success: data.success,
                reservations
            }
            dispatch({
                type: 'INIT_RESERVATIONS',
                payload: response
            })
        })
    }
}

