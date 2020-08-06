import { combineReducers } from 'redux';

import auth from './auth';
import branch from './branch';
import user from './user';

const rootReducer = combineReducers({
  auth,
  user,
  branch,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
