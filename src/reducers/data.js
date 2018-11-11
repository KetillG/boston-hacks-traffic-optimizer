import { SEND_LOCATION_DATA, RECEIVE_LOCATION_DATA } from '../actions/data';

const initialState = {
  isFetching: false,
  data: {
    graph1: [
      ['0700', 20],
      ['0710', 20],
      ['0720', 20],
      ['0730', 21],
      ['0740', 21],
      ['0750', 22],
      ['0800', 23],
      ['0810', 25],
      ['0820', 26],
      ['0830', 26],
      ['0840', 24],
      ['0850', 24],
      ['0900', 23],
      ['0910', 23],
      ['0920', 23],
      ['0930', 22],
      ['0940', 22],
      ['0950', 22],
      ['1000', 22],
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_LOCATION_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_LOCATION_DATA:
      return {
        ...state,

        isFetching: action.isFetching,
        data: action.data,
      };

    default:
      return state;
  }
};
