export default function reducers(state = {}, action) {
    switch (action.type) {
        // case 'GET_SALAS':
        //     return { ...state, ...[action.payload] }
        case 'GET_REVIEWS_BY_SALA':
            return { ...state, list: action.payload }
        case 'GET_REVIEW_BY_RESID':
            return { ...state, ...action.payload }
        case 'SAVE_REVIEW':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}