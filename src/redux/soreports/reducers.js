export default function reducers(state = {}, action) {
    switch (action.type) {
        // case 'GET_SALAS':
        //     return { ...state, ...[action.payload] }
        case 'GET_MONEY_BY_SALA':
            return { ...state, salaMoney: action.payload }
        case 'GET_MONEY_BY_SALA_7':
            return { ...state, salaMoney7: action.payload }
        case 'GET_MONEY_BY_USER':
            return { ...state, userMoney: action.payload }
        case 'GET_MONEY_BY_USER_7':
            return { ...state, userMoney7: action.payload }
        case 'GET_RESERV':
            return { ...state, amountRes: action.payload }
        case 'GET_RESERV_7':
            return { ...state, amountRes7: action.payload }
        case 'NEXT_RESERV':
            return { ...state, nextReserv: action.payload }
        case 'LAST_REVIEW':
            return { ...state, lastReview: action.payload }
        case 'LATEST_SALA':
            return { ...state, latestSala: action.payload }
        default:
            return state;
    }
}