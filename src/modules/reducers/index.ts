import { combineReducers } from 'redux';

import auth from './auth';
import branch from './branch';
import statistics from './statistics';
import user from './user';

const rootReducer = combineReducers({
  auth,
  branch,
  statistics,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
