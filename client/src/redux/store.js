import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// Console log the actions from redux
const middlewares = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
