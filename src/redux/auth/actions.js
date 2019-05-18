import axios from 'axios'

const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  USER_AUTH: 'USER_AUTH',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  login: () => ({
    // type: authActons.LOGIN_REQUEST,
    type: authActons.USER_AUTH,
  }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
};
export default authActons;


export function auth() {
  const request = axios.get('/api/auth');
  return(dispatch) => {
      request.then(({data})=>{
          let response = data;
          dispatch({
              type: 'USER_AUTH',
              payload: response
          })
      })
  }
}