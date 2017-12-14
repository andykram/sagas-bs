import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import config from './config';
import api from './api';

export default combineReducers({
  router: routerReducer,
  config,
  api,
});
