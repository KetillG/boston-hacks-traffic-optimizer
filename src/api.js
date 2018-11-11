// import { store, updateHistory } from './index';
// import { logoutUser } from './actions/auth';

const baseurl = process.env.REACT_APP_SERVICE_URL;

async function request({ method, endpoint = '', data, formdata } = {}) {
  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;
  let options = {};

  if (formdata) {
    options = {
      body: formdata,
      headers: {},
      method: method,
    };
  } else if (data) {
    options = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: method,
    };
  } else {
    options = {
      headers: {},
      method: method,
    };
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  let result = {};
  if (response.status !== 204) {
    result = await response.json();
  }
  // If 401 then log user out
  // if (response.status === 401) {
  //   store.dispatch(logoutUser());
  // }
  // if (response.status === 404) {
  //   updateHistory('/error/404');
  // }
  return { result, status: response.status };
}
export { request };
