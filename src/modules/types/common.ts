import { History, Location } from 'history';

export interface checkFetchType {
  fetch?: boolean;
  error?: boolean | failureType;
}

export interface historyType {
  history: History;
  location?: Location;
}

export interface failureType {
  error: Error;
}
