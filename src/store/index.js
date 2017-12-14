import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';

const configureStore = (initialState, preMiddleware = m => m) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    preMiddleware(applyMiddleware(sagaMiddleware)),
  );

  store.runSaga = sagaMiddleware.run;
  store.endSaga = () => store.dispatch(END);

  return store;
};

export default configureStore;
