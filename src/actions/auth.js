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
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    token: null,
  };
}

const authUrl = process.env.REACT_APP_AUTH_URL;

// Thunk!
export const loginUser = (username, password) => {
  return async dispatch => {
    dispatch(requestLogin());

    let login;
    try {
      login = await request({
        baseurl: authUrl,
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
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch(receiveLogin(user, token));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(logout());
  };
};

export const USERS_ADD_REQUEST = 'USERS_ADD_REQUEST';
export const USERS_ADD_ERROR = 'USERS_ADD_ERROR';
export const USERS_ADD_SUCCESS = 'USERS_ADD_SUCCESS';

export function addingUser() {
  return {
    type: USERS_ADD_REQUEST,
    isAdding: true,
    errors: null,
    added: false,
  };
}

function addUsersError(errors) {
  return {
    type: USERS_ADD_ERROR,
    isAdding: false,
    errors,
    added: false,
  };
}

function receiveAddUser() {
  return {
    type: USERS_ADD_SUCCESS,
    isAdding: false,
    added: true,
    errors: null,
  };
}

export const addUser = (name, username, password) => {
  return async dispatch => {
    dispatch(addingUser());
    let user;
    try {
      user = await request({
        baseurl: authUrl,
        method: 'POST',
        endpoint: 'register',
        data: { name, username, password },
      });
    } catch (e) {
      return dispatch(addUsersError([{ message: e }]));
    }

    if (user.status >= 400) {
      return dispatch(addUsersError(user.result.errors));
    }

    dispatch(receiveAddUser());
  };
};
