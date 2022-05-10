export const loggerMiddleware = (store) => (next) => (action) => {
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
