import { compose, applyMiddleware } from 'redux';
// switch to configureStore:
import { legacy_createStore as createStore } from 'redux';
// For logger: he said action before dispatch, what the action is and how the state looks after the action:
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// middleWare
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log(('currentState', store.getState()));

  // next does a chain trigger - including the useSelector:
  next(action);

  console.log('next state: ', store.getState());
};

// library helpers that run before the action hits the reducer - so it hits the middelware first.
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// root reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);

// state
//recieve and dispatch actions
// store object
