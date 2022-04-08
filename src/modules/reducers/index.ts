import { combineReducers } from 'redux';

import auth from './auth';
import organization from './organization';
import message from './message';
import phone from './phone';
import statistics from './statistics';
import user from './user';

const rootReducer = combineReducers({
  auth,
  message,
  organization,
  phone,
  statistics,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
