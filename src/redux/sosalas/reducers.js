import { Map } from 'immutable';

export default function reducers(state = {}, action) {
    switch (action.type) {
        case 'GET_SALAS':
            // console.log(action.payload);
            return { ...state, ...[action.payload] }
        case 'GET_CURRENT_STATE':
            return { ...state }
        case 'GET_SALA_DETAIL':
            return { ...state, currentSala: action.payload }
        case 'TEST_SALA':
            return { ...state, currentSala: action.payload }
        default:
            return state;
    }
}