export default function reducers(state = {}, action) {
    switch (action.type) {
        case 'USER_REGISTER':
            return {
                ...state,
                register: action.payload.success,
                users: action.payload.users
            }
        case 'USER_LOGIN':
            return { ...state, users: action.payload }
        case 'USER_AUTH':
            return { ...state, users: action.payload }
        default:
            return state;
    }
}