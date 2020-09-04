import { History, Location } from 'history';

export interface FetchType extends FailureType {
  fetch: boolean;
}

export interface HistoryType {
  history?: History;
  location?: Location;
}

export interface FailureType {
  error: Error | boolean;
}
