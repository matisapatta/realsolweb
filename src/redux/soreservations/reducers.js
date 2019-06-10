export default function reducers(state = {}, action) {
    switch (action.type) {
        // case 'GET_SALAS':
        //     return { ...state, ...[action.payload] }
        case 'INIT_RESERVATIONS':
            return { ...state, reservations: action.payload }
        default:
            return state;
    }
}