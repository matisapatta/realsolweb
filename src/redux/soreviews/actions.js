import axios from 'axios';


// export function getReservationsBySala(id) {
//     const request = axios.get(`/api/getreservationsbysala?_id=${id}`)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             let send;
//             if (data)
//                 send = data;
//             else
//                 send = null;
//             dispatch({
//                 type: 'GET_RESERVATIONS_BY_SALA',
//                 payload: send
//             })
//         })
//     }
// }

// export function getReservationsByUser(id) {
//     const request = axios.get(`/api/getreservationsbyuser?_id=${id}`)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             let send;
//             if (data)
//                 send = data;
//             else
//                 send = null;
//             dispatch({
//                 type: 'GET_RESERVATIONS_BY_USER',
//                 payload: send
//             })
//         })
//     }
// }

// export function getReservationById(id) {
//     const request = axios.get(`/api/getreservationbyid?_id=${id}`)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             let send;
//             if (data)
//                 send = data;
//             else
//                 send = null;
//             dispatch({
//                 type: 'GET_RESERVATION_BY_ID',
//                 payload: send
//             })
//         })
//     }
// }


// export function saveReservation(reservation) {
//     const request = axios.post(`/api/savereservation`, reservation)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             // let sala = data.success ? data.sala : null;
//             let reservation = data.reservation ? data.reservation : false;
//             let response = {
//                 // success: data.success,
//                 reservation
//             }
//             dispatch({
//                 type: 'SAVE_RESERVATION',
//                 payload: response
//             })
//         })
//     }
// }
// export function cancelReservation(reservation) {
//     const request = axios.post(`/api/cancelreservation?id=${reservation.id}`, reservation)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             // let sala = data.success ? data.sala : null;
//             let reservation = data.reservation ? data.reservation : false;
//             let response = {
//                 // success: data.success,
//                 reservation
//             }
//             dispatch({
//                 type: 'CANCEL_RESERVATION',
//                 payload: response
//             })
//         })
//     }
// }

// export function deleteReservation(reservation) {
//     const request = axios.post(`/api/deletereservation?id=${reservation._id}`, reservation)
//     return (dispatch) => {
//         request.then(({ data }) => {
//             // let sala = data.success ? data.sala : null;
//             let deleted = data.deleted ? data.deleted : false;
//             let response = {
//                 // success: data.success,
//                 deleted
//             }
//             console.log(response)
//             dispatch({
//                 type: 'DELETE_RESERVATION',
//                 payload: response
//             })
//         })
//     }
// }


