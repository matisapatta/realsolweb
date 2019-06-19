export default function reducers(state = {}, action) {
    switch (action.type) {
        // case 'GET_SALAS':
        //     return { ...state, ...[action.payload] }
        case 'GET_RESERVATIONS_BY_SALA':
            return { ...state, list: action.payload }
        case 'GET_RESERVATIONS_BY_USER':
            return { ...state, userlist: action.payload }
        case 'SAVE_RESERVATION':
            return { ...state, ...action.payload }
        case 'CANCEL_RESERVATION':
            return { ...state, ...action.payload }
        case 'DELETE_RESERVATION':
            return { ...state, deleted: action.payload }
        default:
            return state;
    }
}