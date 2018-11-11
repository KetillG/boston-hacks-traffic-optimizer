import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from '../actions/auth';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = localStorage.getItem('token') || null;
const initialState = {
  isFetching: false,
  isAuthenticated: token ? true : false,
  user: null,
  token: null,
  isUpdating: false,
  updated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
        message: action.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    default:
      return state;
  }
};
