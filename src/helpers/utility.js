import { Map } from 'immutable';
import axios from 'axios';

export function clearToken() {
  localStorage.removeItem('id_token');
}

// export function getToken() {
//   try {
//     const idToken = localStorage.getItem('id_token');
//     return new Map({ idToken });
//   } catch (err) {
//     clearToken();
//     return new Map();
//   }
// }

// export function getToken() {
//   const request = axios.get('/api/auth');
//   return(dispatch) => {
//       request.then(({data})=>{
//           let response = data;
//           dispatch({
//               type: 'USER_AUTH',
//               payload: response
//           })
//           console.log(dispatch);
//       })
//   }
// }

export function getToken(){
  const request = axios.get('/api/auth')
  .then((response) => {
    const idToken = response.data;
    // console.log(idToken);
    return new Map({idToken});
  })
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => num > 9 ? '' + num : '0' + num;
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}
