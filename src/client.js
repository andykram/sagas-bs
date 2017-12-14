/* global document */
/* eslint-env browser */

import 'babel-polyfill';

import jquery from 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import baseConfig from 'config/config';
import Root from 'components/containers/root';

import createStore from 'store';
import mainSaga from 'sagas';

import { CLIENT } from 'constants';

import './styles';

/* eslint no-multi-assign: 0 */
window.jQuery = window.$ = jquery;

const config = baseConfig({
  env: CLIENT,
});

let store;

if (config.node_env === 'production') {
  store = createStore({
    ...window.__data,
    config,
  });
} else {
  window.LiveReloadOptions = { host: 'localhost' };
  /* eslint global-require: 0 import/no-extraneous-dependencies: 0 */
  require('livereload-js');

  /* eslint no-underscore-dangle: 0 */
  store = createStore({
    ...window.__data,
    config,
  }, composeWithDevTools);
}

const history = createHistory();

/* eslint react/jsx-filename-extension: 0 */
const root = (
  <Root
    history={history}
    store={store}
  />
);

store.runSaga(mainSaga(history));

ReactDOM.render(root, document.getElementById('content'));

export default root;
