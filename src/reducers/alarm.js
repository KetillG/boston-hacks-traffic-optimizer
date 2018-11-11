import { SEND_ALARM_DATA, RECEIVE_ALARM_CONFIRMATION } from '../actions/alarm';

const initialState = {
  isFetching: false,
  confirmed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_ALARM_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
        confirmed: action.confirmed,
      };
    case RECEIVE_ALARM_CONFIRMATION:
      return {
        ...state,
        isFetching: action.isFetching,
        confirmed: action.confirmed,
      };

    default:
      return state;
  }
};
