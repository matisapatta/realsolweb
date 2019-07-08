import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: null
});


// export default function authReducer(
//   state = initState.merge(getToken()),
//   action
// ) {
//   switch (action.type) {
//     case actions.LOGIN_SUCCESS:
//       return state.set('idToken', action.token);
//     case actions.LOGOUT:
//       return initState;
//     default:
//       return state;
//   }
// }


export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('idToken', action.token);
    case actions.LOGOUT:
      return initState;
    case 'USER_AUTH':
      // console.log(action.payload.isAuth)
        // return state.set('idToken', action.token);
        return state.set('idToken', action.payload.isAuth);
    default:
      return state;
  }
}