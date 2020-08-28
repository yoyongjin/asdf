import { History, Location } from 'history';

export interface FetchType {
  fetch?: boolean;
  error?: boolean | FailureType;
}

export interface HistoryType {
  history?: History;
  location?: Location;
}

export interface FailureType {
  error: Error;
}
