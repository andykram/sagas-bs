import { takeEvery, put } from 'redux-saga/effects';

import { apiReceive, apiError, API_FETCH, API_POST } from 'actions/api';

import { get, post } from '../../lib/fakeApi';

export function* apiFetch(action) {
  try {
    const res = yield get(action.payload.endpoint, action.payload.options);
    yield put(apiReceive(action.payload.endpoint, res, action.payload.requestId));
  } catch (e) {
    yield put(apiError(e, action.payload.requestId));
  }
}

export function* apiPost(action) {
  try {
    const res = yield post(action.payload.endpoint, action.payload.data);
    yield put(apiReceive(action.payload.endpoint, res, action.payload.requestId));
  } catch (e) {
    yield put(apiError(e, action.payload.requestId));
  }
}

export default function* api() {
  yield takeEvery(API_FETCH, apiFetch);
  yield takeEvery(API_POST, apiPost);
}
