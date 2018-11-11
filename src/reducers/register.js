import {
  USERS_ADD_REQUEST,
  USERS_ADD_ERROR,
  USERS_ADD_SUCCESS,
} from '../actions/auth';

const initialState = {
  isAdding: false,
  errors: [],
  added: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_ADD_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
        added: action.added,
      };
    case USERS_ADD_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
        added: action.added,
      };
    case USERS_ADD_SUCCESS:
      return {
        ...state,
        isAdding: action.isAdding,
        error: action.error,
        added: action.added,
      };

    default:
      return state;
  }
};
