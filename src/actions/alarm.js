import { request } from '../api';

export const SEND_ALARM_DATA = 'SEND_ALARM_DATA';
export const RECEIVE_ALARM_CONFIRMATION = 'RECEIVE_ALARM_CONFIRMATION';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function sendAlarmData() {
  return {
    type: SEND_ALARM_DATA,
    isFetching: true,
    confirmed: false,
  };
}

function receiveAlarmConfirmation() {
  return {
    type: RECEIVE_ALARM_CONFIRMATION,
    isFetching: false,
    confirmed: true,
  };
}

export const registerForAlarm = data => {
  return async dispatch => {
    dispatch(sendAlarmData());

    let data;
    try {
      data = await request({
        baseurl: serverUrl,
        method: 'POST',
        endpoint: 'ayeelmao',
        data: { data },
      });
    } catch (e) {}

    const { result } = data;

    if (result) {
      dispatch(receiveAlarmConfirmation(result));
    }
  };
};
