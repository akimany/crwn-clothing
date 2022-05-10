import { USER_ACTION_TYPES } from './user.types';
import { makeAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  makeAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
