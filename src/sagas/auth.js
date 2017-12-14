import { take, put, call } from 'redux-saga/effects';
import { apiPost, API_RECEIVE, API_ERROR } from 'actions/api';

import {
  LOG_IN,
  logIn,
  loginSuccessful,
  loginFailed,

  SIGN_UP,
  signUpSuccessful,
  signUpFailed,
} from 'actions/auth';

export function* loginFlow() {
  // TODO maybe only watch while logged out
  while (true) {
    const request = yield take(LOG_IN);
    const { login, password } = request.payload;
    const endpoint = 'login';

    const apiRequest = yield put(apiPost(endpoint, { login, password }));
    let loggingIn = true;

    while (loggingIn) {
      const action = yield take([API_RECEIVE, API_ERROR]);

      if (action.payload.requestId === apiRequest.payload.requestId) {
        loggingIn = false;

        if (action.type === API_RECEIVE) {
          yield put(loginSuccessful());
          /* TODO fire action to save current user id to state */
        } else if (action.type === API_ERROR) {
          yield put(loginFailed(action.payload.error));
        }
      }
    }
  }
}

export function* signUpFlow() {
  // TODO maybe only watch while logged out
  while (true) {
    const request = yield take(SIGN_UP);
    const { login, password } = request.payload;
    const endpoint = 'account';

    const apiRequest = yield put(apiPost(endpoint, { login, password }));
    let loggingIn = true;

    while (loggingIn) {
      const action = yield take([API_RECEIVE, API_ERROR]);

      if (action.payload.requestId === apiRequest.payload.requestId) {
        loggingIn = false;

        if (action.type === API_RECEIVE) {
          yield put(signUpSuccessful());
          yield call(logIn, login, password);
        } else if (action.type === API_ERROR) {
          yield put(signUpFailed(action.payload.error));
        }
      }
    }
  }
}
