import { request } from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  };
}

export function receiveLogin(user, token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    token,
    message: null,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function logout() {
  // localStorage.removeItem('user');
  // localStorage.removeItem('token');

  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    token: null,
  };
}

// Thunk!
export const loginUser = (username, password) => {
  return async dispatch => {
    dispatch(requestLogin());

    let login;
    try {
      login = await request({
        method: 'POST',
        endpoint: 'login',
        data: { username, password },
      });
    } catch (e) {
      return dispatch(loginError(e));
    }
    const { result } = login;

    if (result && result.error) {
      dispatch(loginError(login.result.error));
    }

    if (result && result.user) {
      const { user, token } = login.result;
      // localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('token', token);
      dispatch(receiveLogin(user, token));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(logout());
  };
};
