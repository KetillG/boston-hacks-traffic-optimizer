import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import data from './data';
import alarm from './alarm';

export default combineReducers({ alarm, auth, data, register });
