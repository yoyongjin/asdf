import { combineReducers } from 'redux';

import auth from './auth';
import branch from './branch';
import phone from './phone';
import statistics from './statistics';
import user from './user';

const rootReducer = combineReducers({
  auth,
  branch,
  phone,
  statistics,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
