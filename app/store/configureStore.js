import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import nav from '../reducers/nav';

const logger = createLogger();
const rootReducer = combineReducers(
  {
    nav,
    auth,
  }
);

const initialState = {};

export default  store = configureStore();

function configureStore() {
  let store;
  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ));
  }

  return store;
}
