import { takeEvery, call } from 'redux-saga/effects';
import url from 'url';
import { matchPath } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import home from './home';
import privacyPolicy from './privacyPolicy';
import signUp from './signUp';
import termsOfService from './termsOfService';
import error404 from './error404';

// There's a bug in babel preventing us from `export default` here - the
// resulting code throws errors in webpack about "unexpected punc([)" with
// the dynamic properties below. This works, though.
const routes = [
  home,
  privacyPolicy,
  signUp,
  termsOfService,
  error404,
];

export default routes;

export function* route(action) {
  const currentUrl = url.format(action.payload.pathname);

  let pageRoute;

  routes.find((r) => {
    if (matchPath(currentUrl, { path: r.path, exact: true })) {
      pageRoute = r;
      return true;
    }

    return false;
  });

  yield call(pageRoute.run.bind(pageRoute));
}

export function* routeAll() {
  yield takeEvery(LOCATION_CHANGE, route);
}
