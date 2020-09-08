import { History, Location } from 'history';

export interface FetchType {
  fetch: boolean;
  error: string;
}

export interface RouterType {
  history?: History;
  location?: Location;
}
