import { request } from '../api';

export const SEND_LOCATION_DATA = 'SEND_LOCATION_DATA';
export const RECEIVE_LOCATION_DATA = 'RECEIVE_LOCATION_DATA';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function sendLocationData() {
  return {
    type: SEND_LOCATION_DATA,
    isFetching: true,
    data: null,
  };
}

function receiveLocationData(data) {
  return {
    type: RECEIVE_LOCATION_DATA,
    isFetching: false,
    data,
  };
}

export const getTravelData = (
  origin,
  destination,
  departOrigin,
  depDestinaton
) => {
  return async dispatch => {
    dispatch(sendLocationData());

    let data;
    try {
      data = await request({
        baseurl: serverUrl,
        method: 'POST',
        endpoint: 'ayeelmao',
        data: { origin, destination, departOrigin, depDestinaton },
      });
    } catch (e) {}

    const { result } = data;

    if (result) {
      dispatch(receiveLocationData(result));
    }
  };
};
