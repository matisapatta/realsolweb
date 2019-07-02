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
        case 'SAVE_SALA':
            return { ...state, currentSala: action.payload, loading: false }
        case 'UPDATE_SALA':
            return { ...state, currentSala: action.payload, loading: false }
        case 'DELETE_SALA':
            return { ...state, ...action.payload, loading: false }
        // case 'ADD_SCORE_TO_SALA':
        //     return { ...state, updatedSala: action.payload }
        case 'GET_SALA_OWNER':
            return { ...state, listSalas: action.payload }
        case 'CLEAN_PROPS':
            return { ...state, currentSala: action.payload }
        default:
            return state;
    }
}