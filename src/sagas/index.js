import { fork } from 'redux-saga/effects';

import { routeAll, route } from '../routes';
import api from './api';
import { loginFlow, signUpFlow } from './auth';

export default function root(history, runInitialRoute = false) {
  return function* sagas() {
    yield [
      fork(api),
      fork(signUpFlow),
      fork(loginFlow),
      fork(routeAll),
    ];

    if (runInitialRoute) {
      yield route({ payload: { pathname: history.location } });
    }
  };
}
